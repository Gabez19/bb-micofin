// Local: /src/pages/Configuracoes.js
// CÓDIGO ATUALIZADO

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Cabecalho from '../components/Cabecalho';
import BarraNavegacao from '../components/BarraNavegacao';
import EditarPerfil from '../components/EditarPerfil';
import AlterarSenha from '../components/AlterarSenha';
import './Configuracoes.css';

export default function Configuracoes() {
  const navigate = useNavigate();
  const [view, setView] = useState('menu');
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Falha ao sair. Tente novamente.");
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'perfil':
        return <EditarPerfil onBack={() => setView('menu')} />;
      case 'senha':
        return <AlterarSenha onBack={() => setView('menu')} />;
      default:
        return (
          <div>
            <button className="settings-menu-button" onClick={() => setView('perfil')}>
              <span>Editar Perfil</span><span className="arrow">&gt;</span>
            </button>
            <button className="settings-menu-button" onClick={() => setView('senha')}>
              <span>Alterar Senha</span><span className="arrow">&gt;</span>
            </button>
            <button className="settings-menu-button btn-logout" onClick={handleLogout}>
              <span>Sair</span><span className="arrow">&gt;</span>
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="configuracoes-page">
      <Cabecalho />
      {loading ? (
        <div className="pagina-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando...</p>
          </div>
        </div>
      ) : (
        <div className="pagina-container">
          <div className="settings-wrapper">
            <h2 className="settings-title">Configurações</h2>
            <div className="settings-card">
              {renderContent()}
            </div>
          </div>
        </div>
      )}
      <BarraNavegacao />
    </div>
  );
}