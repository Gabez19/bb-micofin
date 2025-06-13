import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BarraNavegacao from './components/BarraNavegacao.jsx';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Mapa from './pages/Mapa.jsx';
import Desafio from './pages/Desafio.jsx';
import Missoes from './pages/Missoes.jsx';
import Recompensas from './pages/Recompensas.jsx';
import Estatisticas from './pages/Estatisticas.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import './App.css'; // Certifique-se de importar o CSS

function LayoutComRoteamento() {
  const location = useLocation();

  // Esconde a navbar em páginas específicas
  const esconderNavbar = ['/', '/login', '/register'].includes(location.pathname) ||
    location.pathname.startsWith('/desafio');

  return (
    <div className="App">
      {!esconderNavbar && <BarraNavegacao />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/desafio/:ilhaId" element={<Desafio />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutComRoteamento />
    </BrowserRouter>
  );
}