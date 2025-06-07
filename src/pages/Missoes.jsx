import React from 'react';
import Cabecalho from '../components/Cabecalho';
import './Missoes.css';

const missoesDiarias = [
  {
    isConcluido: false,
    texto: "Caminhe pelos arredores e colete 3 tipos de frutas.",
    moedas: 60,
    xp: 60,
  },
  {
    isConcluido: true,
    texto: "Anote todos os gastos feitos hoje, classificando-os como essenciais ou não essenciais.",
    moedas: 10,
    xp: 5,
  },
  {
    isConcluido: false,
    texto: "Verifique suas metas financeiras de curto prazo e ajuste caso necessário.",
    moedas: 5,
    xp: 10,
  },
  {
    isConcluido: false,
    texto: "Assista a um vídeo rápido sobre finanças pessoais.",
    moedas: 20,
    xp: 10,
  },
  {
    isConcluido: true,
    texto: "Crie um plano de orçamento para a semana, definindo limites de gastos em diferentes categorias.",
    moedas: 50,
    xp: 20,
  },
];

const missoesSemanais = [
  {
    isConcluido: true,
    texto: "Compare preços em três lugares antes de comprar.",
    moedas: 30,
    xp: 20,
  },
  {
    isConcluido: false,
    texto: "Revise compras dos últimos 30 dias para cortar gastos.",
    moedas: 40,
    xp: 25,
  },
  {
    isConcluido: true,
    texto: "Anote todos os gastos da semana para economizar depois.",
    moedas: 60,
    xp: 30,
  },
  {
    isConcluido: false,
    texto: "Economize uma porcentagem maior que o habitual.",
    moedas: 100,
    xp: 50,
  },
  {
    isConcluido: true,
    texto: "Reserve 10% do rendimento em poupança.",
    moedas: 40,
    xp: 35,
  },
];

export default function Missoes() {
  return (
    <div className="pagina-container">
      <Cabecalho />
      <div className="pagina-missoes">
        <h2>Suas Missões</h2>

        <div className="missoes-grid">
          <section className="missao-tipo">
            <h3 className="subtitulo">Missões Diárias:</h3>
            <div className="missoes-lista">
              {missoesDiarias.map((missao, idx) => (
                <div
                  key={idx}
                  className={`cartao-missao ${missao.isConcluido ? 'concluido' : 'pendente'}`}
                >
                  <div className="icone-status">
                    {missao.isConcluido ? '✔️' : '🕒'}
                  </div>
                  <p className="texto-missao">{missao.texto}</p>
                  <div className="recompensas">
                    <span className="moedas">🪙 {missao.moedas}</span>
                    <span className="xp">⭐ {missao.xp}</span>
                  </div>
                  {missao.isConcluido && <div className="label-concluido">Concluído</div>}
                </div>
              ))}
            </div>
          </section>

          <section className="missao-tipo">
            <h3 className="subtitulo">Missões Semanais:</h3>
            <div className="missoes-lista">
              {missoesSemanais.map((missao, idx) => (
                <div
                  key={idx}
                  className={`cartao-missao ${missao.isConcluido ? 'concluido' : 'pendente'}`}
                >
                  <div className="icone-status">
                    {missao.isConcluido ? '✔️' : '🕒'}
                  </div>
                  <p className="texto-missao">{missao.texto}</p>
                  <div className="recompensas">
                    <span className="moedas">🪙 {missao.moedas}</span>
                    <span className="xp">⭐ {missao.xp}</span>
                  </div>
                  {missao.isConcluido && <div className="label-concluido">Concluído</div>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}