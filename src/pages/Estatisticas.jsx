// Local: /src/pages/Estatisticas.js
// CÓDIGO CORRIGIDO

import React, { useEffect, useState } from 'react';
import Cabecalho from '../components/Cabecalho';
import BarraNavegacao from '../components/BarraNavegacao';
import './Estatisticas.css';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const IconeHandMico = ({ className }) => (
  <img src="/icons/IconeHandMico.png" alt="Ícone MiCoin" className={className} />
);

const IconeXP = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59L6.5 12.09l1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z"/>
  </svg>
);

const Estatisticas = () => {
  const [usuario, setUsuario] = useState(null);
  const [fases, setFases] = useState([]);

  // Lógica de carregamento de dados (sem alterações)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUsuario(user || null));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const carregarFases = async () => {
      try {
        const resposta = await fetch('/data.json');
        const json = await resposta.json();
        const fasesProcessadas = json.ilhas.map((ilha) => ({
          id: ilha.id,
          nome: `Fase ${ilha.nome}`,
          xp: ilha.desafio.questoes.reduce((acc, q) => acc + (q.qtd_xp || 0), 0),
          micoins: ilha.desafio.questoes.reduce((acc, q) => acc + (q.qtd_micoin || 0), 0),
          concluida: ilha.concluida,
        }));
        setFases(fasesProcessadas);
      } catch (erro) {
        console.error('Erro ao carregar data.json:', erro);
      }
    };
    carregarFases();
  }, []);

  const semanasExemplo = [
    { numero: 1, status: 'verde' }, { numero: 2, status: 'amarelo' },
    { numero: 3, status: 'vermelho' }, { numero: 4, status: 'vermelho' }
  ];
  const statusMap = {
    verde: { cor: '#4CAF50', opacidade: 1 },
    amarelo: { cor: '#FFC107', opacidade: 0.5 },
    vermelho: { cor: '#F44336', opacidade: 0.2 },
  };

  return (
    <div className="estatisticas-page">
      <Cabecalho />
      
      {/* O .pagina-container agora é o fundo cinza da página inteira */}
      <div className="pagina-container">
        
        {/* ESTE É O NOVO CONTAINER BRANCO PRINCIPAL */}
        <div className="stats-content-wrapper">
          <header className="page-header">
            <h1>Estatísticas de Desempenho</h1>
            <p>Olá, {usuario ? usuario.displayName || usuario.email : 'Visitante'}! Acompanhe seu progresso.</p>
          </header>

          <div className="stats-grid">
            
            <div className="card semanal-card">
              <h2 className="card-title">Progresso Semanal</h2>
              <div className="semanas-container">
                {semanasExemplo.map((semana, index) => {
                  const { cor, opacidade } = statusMap[semana.status] || { cor: '#9E9E9E', opacidade: 1 };
                  return (
                    <div key={index} className="semana-item">
                      <div className="semana-icone" style={{ backgroundColor: cor, opacity: opacidade }}>
                        <IconeHandMico className="icone-pequeno" />
                      </div>
                      <span className="semana-numero">Semana {semana.numero}</span>
                    </div>
                  );
                })}
              </div>
              <div className="legenda">
                <div className="legenda-item"><span className="legenda-cor verde"></span> Concluído</div>
                <div className="legenda-item"><span className="legenda-cor amarelo"></span> Pendente</div>
                <div className="legenda-item"><span className="legenda-cor vermelho"></span> Incompleto</div>
              </div>
            </div>
            
            {fases.map((fase) => (
              <div key={fase.id} className={`card fase-card ${fase.concluida ? 'concluida' : ''}`}>
                <div className="fase-header">
                  <h3 className="fase-nome">{fase.nome}</h3>
                  {fase.concluida && <span className="status-badge">Concluída</span>}
                </div>
                <div className="fase-body">
                  <div className="stat-item">
                    <IconeXP className="stat-icone xp" />
                    <span className="stat-valor">{fase.xp}</span>
                    <span className="stat-label">XP</span>
                  </div>
                  <div className="stat-item">
                    <IconeHandMico className="stat-icone micoin" />
                    <span className="stat-valor">{fase.micoins}</span>
                    <span className="stat-label">MiCoins</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BarraNavegacao />
    </div>
  );
};

export default Estatisticas;