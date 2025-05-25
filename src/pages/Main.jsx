import { useNavigate } from 'react-router-dom';
import '../components/Cabecalho.css';
import './Auth.css';

export default function Main() {
  const nav = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-container">
        <img src="/icons/micofin.png" alt="MicoFin" className="logo" />
        <h1 className="auth-title">MicoFin</h1>

        <div className="auth-actions">
          <button className="btn btn-outline-light"
                  onClick={() => nav('/register')}>
            Criar Conta
          </button>
          <button className="btn btn-primary"
                  onClick={() => nav('/login')}>
            Entrar
          </button>
        </div>

        <button className="btn btn-outline-light fullwidth mb-10">
          Entrar com conta BB
        </button>
      </div>
    </div>
  );
}