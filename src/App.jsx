import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BarraNavegacao from './components/BarraNavegacao.jsx';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Mapa from './pages/Mapa.jsx';
import Desafio from './pages/Desafio.jsx'; // Importe o novo componente

function LayoutComRoteamento() {
  const location = useLocation();

  // Adicione '/desafio/*' nas rotas que escondem a navbar
  const esconderNavbar = ['/', '/login', '/register', '/desafio/*'].includes(location.pathname) || 
                         location.pathname.startsWith('/desafio/');

  return (
    <>
      {!esconderNavbar && <BarraNavegacao />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/mapa" element={<Mapa />} />
        {/* Adicione esta nova rota */}
        <Route path="/desafio/:ilhaId" element={<Desafio />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutComRoteamento />
    </BrowserRouter>
  );
}