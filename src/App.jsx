import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import BarraNavegacao from './components/BarraNavegacao.jsx';
import Main           from './pages/Main.jsx';
import Login          from './pages/Login.jsx';
import Registro       from './pages/Registro.jsx';
import Mapa           from './pages/Mapa.jsx';

/*import Configuracoes from './pages/Configuracoes.jsx';
  <Route path="/configuracoes/*" element={<Configuracoes />} />
*/

function LayoutComRoteamento() {
  const location = useLocation();

  const esconderNavbar = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <>
      {!esconderNavbar && <BarraNavegacao />}
      <Routes>
        <Route path="/"         element={<Main />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/mapa"     element={<Mapa />} />
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