import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white py-12 border-t border-[#00C2FF]/20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[#00C2FF]">COMPIA</span> Editora
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Especializada em livros e materiais de Inteligência Artificial para o futuro da tecnologia.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-[#00C2FF] transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Navegação</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-[#00C2FF] transition-colors">Início</a></li>
            <li><a href="/shop" className="hover:text-[#00C2FF] transition-colors">Livros & E-books</a></li>
            <li><a href="/about" className="hover:text-[#00C2FF] transition-colors">Sobre Nós</a></li>
            <li><a href="/contact" className="hover:text-[#00C2FF] transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Categorias</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/shop?cat=ia" className="hover:text-[#00C2FF] transition-colors">Inteligência Artificial</a></li>
            <li><a href="/shop?cat=arch" className="hover:text-[#00C2FF] transition-colors">Arquitetura de Software</a></li>
            <li><a href="/shop?cat=security" className="hover:text-[#00C2FF] transition-colors">Cibersegurança</a></li>
            <li><a href="/shop?cat=blockchain" className="hover:text-[#00C2FF] transition-colors">Blockchain</a></li>
            <li><a href="/shop?cat=robotics" className="hover:text-[#00C2FF] transition-colors">Robótica</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-[#00C2FF]" />
              <span>Av. Paulista, 1000 - SP</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#00C2FF]" />
              <span>+55 (11) 99999-9999</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[#00C2FF]" />
              <span>contato@compia.com.br</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center w-full">&copy; 2026 COMPIA Editora. Todos os direitos reservados.</p>
        
      </div>
    </footer>
  );
}
