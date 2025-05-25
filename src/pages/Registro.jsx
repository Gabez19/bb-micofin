import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import './Auth.css';

export default function Registro() {
  const [nome, setNome]           = useState('');
  const [email, setEmail]         = useState('');
  const [senha, setSenha]         = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro]           = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmar) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCred.user, { displayName: nome });

      const uid = userCred.user.uid;

      // Dados do usuário
      const dadosUsuario = {
        nome,
        email,
        data_criada: new Date().toISOString(),
        moedas: 0,
        progresso: "nivel_1",
        xp: 0
      };

      await setDoc(doc(db, "usuarios", uid), dadosUsuario);

      nav('/mapa');
    } catch (err) {
      setErro('Erro ao registrar: ' + err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <button className="back-button" onClick={() => nav(-1)} aria-label="Voltar">
          <img src="/icons/seta-voltar.png" alt="Voltar" />
        </button>
        <img src="/icons/micofin.png" className="logo" alt="MicoFin" />
        <h1 className="auth-title">Crie sua conta</h1>
        {erro && <p className="erro">{erro}</p>}

        <form onSubmit={submit} className="auth-form">
          <div className="form-group">
            <label>Nome completo</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirmar senha</label>
            <input type="password" value={confirmar} onChange={e => setConfirmar(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary fullwidth">Registrar</button>
        </form>

        <button className="btn btn-outline-light fullwidth mb-10" onClick={() => nav('/login')}>
          Já tenho conta
        </button>
      </div>
    </div>
  );
}