from datetime import datetime, timedelta, timezone
from decimal import Decimal
from urllib.parse import quote_plus
from uuid import uuid4
from sqlalchemy.orm import Session
from app.core.database import get_db

from fastapi import APIRouter, Depends, HTTPException, status, Request

from app.schemas.payment import (
    PaymentConfirmResponse,
    PaymentCreateRequest,
    PaymentMethod,
    PaymentResponse,
    PaymentStatus,
    PixPaymentData,
)

from app.dependencies.auth import get_current_user
from app.models.user import User
from app.services.audit_service import log_activity

router = APIRouter()

_PAYMENT_STORE: dict[str, dict] = {}


def _to_brl_cents(amount: Decimal) -> int:
    return int(amount * 100)


@router.get("/options")
def list_payment_options() -> dict[str, list[str]]:
    return {
        "gateways": ["pagseguro", "mercadopago", "stripe", "paypal"],
        "card_brands": ["visa", "mastercard", "elo", "amex", "hipercard"],
        "methods": ["card", "pix"],
    }


@router.post("", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def create_payment( request: Request,
    payload: PaymentCreateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),) -> PaymentResponse:
    if payload.method == PaymentMethod.CARD and payload.card is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Dados do cartão são obrigatórios para pagamento em cartão.",
        )

    transaction_id = f"txn_{uuid4().hex[:18]}"

    if payload.method == PaymentMethod.PIX:
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=30)
        pix_key = str(uuid4())
        amount_cents = _to_brl_cents(payload.amount)
        qr_code_text = (
            f"00020126330014BR.GOV.BCB.PIX0114{pix_key}"
            f"520400005303986540{payload.amount:.2f}5802BR5912COMPIA STORE"
            f"6009SAO PAULO62070503***6304{amount_cents:04d}"
        )
        qr_code_url = (
            "https://api.qrserver.com/v1/create-qr-code/"
            f"?size=280x280&data={quote_plus(qr_code_text)}"
        )
        response = PaymentResponse(
            transaction_id=transaction_id,
            status=PaymentStatus.PENDING,
            gateway=payload.gateway,
            method=payload.method,
            amount=payload.amount,
            currency=payload.currency,
            message="PIX gerado com sucesso. Aguardando confirmação do pagamento.",
            pix=PixPaymentData(
                pix_key=pix_key,
                qr_code_text=qr_code_text,
                qr_code_url=qr_code_url,
                expires_at=expires_at,
            ),
        )
        _PAYMENT_STORE[transaction_id] = {
            "payment": response,
            "owner_email": user.email,
        }

        log_activity(
            db=db,
            user_email=user.email,
            action="payment.create",
            entity="payment",
            entity_id=transaction_id,
            ip=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent"),
            meta={"method": "pix", "amount": float(payload.amount), "gateway": payload.gateway},
        )

        db.commit()

        return response

    response = PaymentResponse(
        transaction_id=transaction_id,
        status=PaymentStatus.APPROVED,
        gateway=payload.gateway,
        method=payload.method,
        amount=payload.amount,
        currency=payload.currency,
        message="Pagamento com cartão aprovado.",
    )

    log_activity(
        db=db,
        user_email=user.email,
        action="payment.create",
        entity="payment",
        entity_id=transaction_id,
        ip=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
        meta={"method": "card", "amount": float(payload.amount), "gateway": payload.gateway},
    )

    db.commit()

    _PAYMENT_STORE[transaction_id] = {
        "payment": response,
        "owner_email": user.email,
    }

    return response


@router.post("/{transaction_id}/confirm", response_model=PaymentConfirmResponse)
def confirm_pix_payment(
    request: Request,
    transaction_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> PaymentConfirmResponse:

    record = _PAYMENT_STORE.get(transaction_id)

    if record is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transação não encontrada.",
        )

    payment = record["payment"]
    owner_email = record["owner_email"]

    if user.role not in ("admin", "seller") and user.email != owner_email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Sem permissão para confirmar este pagamento.",
        )

    if payment.method != PaymentMethod.PIX:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Somente pagamentos PIX podem ser confirmados por este endpoint.",
        )

    if payment.pix and datetime.now(timezone.utc) > payment.pix.expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="PIX expirado.",
        )

    if payment.status == PaymentStatus.APPROVED:
        return PaymentConfirmResponse(
            transaction_id=transaction_id,
            status=PaymentStatus.APPROVED,
            message="Pagamento PIX já estava confirmado.",
        )

    payment.status = PaymentStatus.APPROVED
    payment.message = "Pagamento PIX confirmado com sucesso."

    _PAYMENT_STORE[transaction_id] = {
        "payment": payment,
        "owner_email": owner_email,
    }

    log_activity(
        db=db,
        user_email=user.email,
        action="payment.pix_confirm",
        entity="payment",
        entity_id=transaction_id,
        ip=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )

    db.commit()

    return PaymentConfirmResponse(
        transaction_id=transaction_id,
        status=PaymentStatus.APPROVED,
        message="Pagamento PIX confirmado com sucesso.",
    )