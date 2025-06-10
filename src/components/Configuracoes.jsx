import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Componentes - certifique-se que existem
import Cabecalho from "./Cabecalho";
import BarraNavegacao from "./BarraNavegacao";
import EditarPerfil from "../pages/EditarPerfil";
import AlterarSenha from "../pages/AlterarSenha";
import "./Configuracoes.css";

export default function Configuracoes() {
  const navigate = useNavigate();
  const [view, setView] = useState("menu");
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Falha ao sair. Tente novamente.");
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (view) {
      case "perfil":
        return (
          <EditarPerfil usuario={usuario} onBack={() => setView("menu")} />
        );
      case "senha":
        return (
          <AlterarSenha usuario={usuario} onBack={() => setView("menu")} />
        );
      default:
        return (
          <div className="settings-menu">
            <button
              className="settings-menu-button"
              onClick={() => setView("perfil")}
            >
              <span>Editar Perfil</span>
              <span className="arrow">&gt;</span>
            </button>
            <button
              className="settings-menu-button"
              onClick={() => setView("senha")}
            >
              <span>Alterar Senha</span>
              <span className="arrow">&gt;</span>
            </button>
            <button
              className="settings-menu-button btn-logout"
              onClick={handleLogout}
            >
              <span>Sair</span>
              <span className="arrow">&gt;</span>
            </button>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="configuracoes-page">
        <Cabecalho />
        <div className="pagina-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando...</p>
          </div>
        </div>
        <BarraNavegacao />
      </div>
    );
  }

  return (
    <div className="configuracoes-page">
      <Cabecalho />
      <div className="pagina-container">
        <div className="settings-wrapper">
          <h2 className="settings-title">Configurações</h2>
          <div className="settings-card">{renderContent()}</div>
        </div>
      </div>
      <BarraNavegacao />
    </div>
  );
}
