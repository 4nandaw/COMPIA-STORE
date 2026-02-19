import { RouterProvider } from 'react-router';
import { router } from './app/routes';
import "./styles/global.css";

export function App() {
  return <RouterProvider router={router} />;
}

