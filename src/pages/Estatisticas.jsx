import React, { useEffect, useState } from 'react';
import Cabecalho from '../components/Cabecalho';
import './Estatisticas.css';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Ícone da mão em PNG da pasta public/icons
const IconeHandMico = ({ opacity }) => (
  <img
    src="/icons/IconeHandMico.png"
    alt="Ícone mão micoin"
    style={{ width: '24px', height: '24px', opacity }}
  />
);

const Estatisticas = () => {
  const [usuario, setUsuario] = useState(null);
  const [fases, setFases] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const carregarFases = async () => {
      try {
        const resposta = await fetch('/data.json');
        const json = await resposta.json();

        const fasesProcessadas = json.ilhas.map((ilha) => {
          const totalXP = ilha.desafio.questoes.reduce((acc, q) => acc + (q.qtd_xp || 0), 0);
          const totalMicoins = ilha.desafio.questoes.reduce((acc, q) => acc + (q.qtd_micoin || 0), 0);
          return {
            nome: `Fase ${ilha.nome}`,
            xp: totalXP,
            micoins: totalMicoins,
            concluida: ilha.concluida
          };
        });

        setFases(fasesProcessadas);
      } catch (erro) {
        console.error('Erro ao carregar data.json:', erro);
      }
    };

    carregarFases();
  }, []);

  const getOpacidade = (status) => {
    switch (status) {
      case 'verde': return 1;
      case 'amarelo': return 0.5;
      case 'vermelho': return 0.2;
      default: return 1;
    }
  };

  const getCorSemana = (status) => {
    switch (status) {
      case 'verde': return '#4CAF50';
      case 'amarelo': return '#FFC107';
      case 'vermelho': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const semanasExemplo = [
    { numero: 1, status: 'verde' },
    { numero: 2, status: 'amarelo' },
    { numero: 3, status: 'vermelho' },
    { numero: 4, status: 'vermelho' }
  ];

  return (
    <div className="estatisticas-container">
      <Cabecalho />

      <div className="conteudo-principal">
        <h1 className="saudacao">
          Olá, {usuario ? usuario.displayName || usuario.email : 'Visitante'}
        </h1>
        <p className="descricao">Aqui será apresentado todo seu avanço</p>

        {/* Progresso Semanal */}
        <section className="progresso-semanal">
          <h2>Progresso Semanal</h2>
          <div className="semanas-container">
            {semanasExemplo.map((semana, index) => (
              <div key={index} className="semana-item">
                <div className="semana-icone" style={{ backgroundColor: getCorSemana(semana.status) }}>
                  <IconeHandMico opacity={getOpacidade(semana.status)} />
                </div>
                <span className="semana-numero">Semana {semana.numero}</span>
              </div>
            ))}
          </div>
          <div className="legenda">
            <div className="legenda-item">
              <div className="legenda-cor verde"></div>
              <span>Acesso no App e Tarefas concluídas</span>
            </div>
            <div className="legenda-item">
              <div className="legenda-cor amarelo"></div>
              <span>Aguardando Acesso no App</span>
            </div>
            <div className="legenda-item">
              <div className="legenda-cor vermelho"></div>
              <span>Acesso no App e Tarefas incompletas</span>
            </div>
          </div>
        </section>

        {/* Progresso por Fase */}
        <section className="progresso-fases">
          <h2>Progresso por Fase</h2>
          <ul className="lista-fases">
            {fases.map((fase, index) => (
              <li key={index} className={`fase-item ${fase.concluida ? 'concluida' : ''}`}>
                <h3>{fase.nome}</h3>
                <p>XP: {fase.xp}</p>
                <p>Micoins: {fase.micoins}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Estatisticas;
