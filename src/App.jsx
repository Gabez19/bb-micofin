import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BarraNavegacao from './components/BarraNavegacao.jsx';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Mapa from './pages/Mapa.jsx';
import Desafio from './pages/Desafio.jsx';
import Missoes from './pages/Missoes.jsx';  // Importa a página de Missões
import Recompensas from './pages/Recompensas.jsx'; // Importa a página de Recompensas

function LayoutComRoteamento() {
  const location = useLocation();

  // Esconde a navbar em páginas específicas
  const esconderNavbar = ['/', '/login', '/register'].includes(location.pathname) || 
                         location.pathname.startsWith('/desafio');

  return (
    <>
      {!esconderNavbar && <BarraNavegacao />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/missoes" element={<Missoes />} />  {/* Rota adicionada */}
        <Route path="/desafio/:ilhaId" element={<Desafio />} />
        <Route path="/recompensas" element={<Recompensas />} />
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
