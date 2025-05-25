import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import '../components/Cabecalho.css';
import './Auth.css';

export default function Login() {
  const [email, setEmail]     = useState('');
  const [senha, setSenha]     = useState('');
  const [erro,  setErro]      = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErro('');
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      nav('/mapa');
    } catch {
      setErro('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <button className="back-button" onClick={() => nav(-1)} aria-label="Voltar">
        <img src="/icons/seta-voltar.png" alt="Voltar" />
        </button>
        <img src="/icons/micofin.png" className="logo" />
        <h1 className="auth-title">Entrar no MicoFin</h1>
        {erro && <p className="erro">{erro}</p>}

        <form onSubmit={submit} className="auth-form">
          <div className="form-group">
            <label>E-mail</label>
            <input type="email"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password"
                   value={senha}
                   onChange={e => setSenha(e.target.value)}
                   required />
          </div>
          <button type="submit"
                  className="btn btn-outline-light fullwidth mb-10">
            Entrar
          </button>
        </form>

        <button className="btn btn-primary fullwidth"
                onClick={() => nav('/register')}>
          Criar conta
        </button>
      </div>
    </div>
  );
}