import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Cabecalho from "../components/Cabecalho";
import "./Recompensas.css";

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecompensas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Verifica se há usuário autenticado
        if (!auth.currentUser) {
          setError("Usuário não autenticado");
          navigate("/login");
          return;
        }

        const userDoc = await getDoc(doc(db, "usuarios", auth.currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRecompensas(userData.recompensas || []);
        } else {
          setError("Dados do usuário não encontrados");
        }
      } catch (error) {
        console.error("Erro ao buscar recompensas:", error);
        setError("Erro ao carregar recompensas. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    // Verifica se o usuário está carregado antes de fazer a consulta
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchRecompensas();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleImageError = (e) => {
    e.target.src = "/images/placeholder.png"; // Imagem padrão
    e.target.alt = "Imagem não disponível";
  };

  if (loading) {
    return (
      <div className="recompensas-page">
        <Cabecalho />
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando suas recompensas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recompensas-page">
        <Cabecalho />
        <div className="container">
          <div className="error-container">
            <h2>Ops! Algo deu errado</h2>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recompensas-page">
      <Cabecalho />
      <div className="container">
        <h1>Suas Recompensas</h1>
        
        {recompensas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏆</div>
            <h2>Nenhuma recompensa ainda</h2>
            <p>Complete missões para ganhar recompensas incríveis!</p>
            <button 
              className="goto-missions-button"
              onClick={() => navigate("/missoes")}
            >
              Ver Missões
            </button>
          </div>
        ) : (
          <div className="recompensas-list">
            {recompensas.map((recompensa, index) => (
              <div key={`recompensa-${index}`} className="recompensa-item">
                <div className="recompensa-image-container">
                  <img 
                    src={recompensa.imagem} 
                    alt={recompensa.titulo}
                    onError={handleImageError}
                    className="recompensa-image"
                  />
                </div>
                <div className="recompensa-content">
                  <h2 className="recompensa-titulo">{recompensa.titulo}</h2>
                  <p className="recompensa-descricao">{recompensa.descricao}</p>
                  {recompensa.pontos && (
                    <div className="recompensa-pontos">
                      <span>⭐ {recompensa.pontos} pontos</span>
                    </div>
                  )}
                  {recompensa.dataConquista && (
                    <div className="recompensa-data">
                      <small>Conquistado em: {new Date(recompensa.dataConquista).toLocaleDateString('pt-BR')}</small>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}