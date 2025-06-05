import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';

const ContainerDesafio = styled.div`
  background-color: #fff;
  color: #2e7d32;
  padding: 90px 20px 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  box-sizing: border-box;
`;

const VideoAula = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin: 20px 0;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const QuestaoBox = styled.div`
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const Feedback = styled.div`
  margin-top: 10px;
  color: red;
`;

const Botao = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #1b5e20;
  }
`;

export default function Desafio() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { desafio, ilhaId } = state || {};
  const [etapa, setEtapa] = useState(1); // 1 = vídeo, 2 = questões
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [acertou, setAcertou] = useState(false);

  if (!desafio) {
    return (
      <ContainerDesafio>
        <h2>Desafio não encontrado</h2>
        <Botao onClick={() => navigate('/mapa')}>Voltar ao Mapa</Botao>
      </ContainerDesafio>
    );
  }

  const questaoAtual = desafio.questoes[indice];

  function verificarResposta() {
    if (respostaSelecionada === null) return;
    if (respostaSelecionada === questaoAtual.resposta_correta) {
      setAcertou(true);
      setFeedback('');
    } else {
      setFeedback('Resposta incorreta! Tente novamente.');
      setRespostaSelecionada(null);
    }
  }

  function avancarQuestao() {
    if (indice + 1 < desafio.questoes.length) {
      setIndice(indice + 1);
      setRespostaSelecionada(null);
      setAcertou(false);
      setFeedback('');
    } else {
      navigate('/mapa');
    }
  }

  return (
    <ContainerDesafio>
      <h1>Desafio da Ilha {ilhaId}: {desafio.titulo}</h1>

      {etapa === 1 && (
        <>
          <p>{desafio.descricao}</p>
          <p>Vamos aprender mais sobre esse conceito essencial!</p>
          {desafio.link_video && (
            <VideoAula>
              <video controls src={desafio.link_video} />
            </VideoAula>
          )}
          <Botao onClick={() => navigate('/mapa')}>Voltar ao Mapa</Botao>
          <Botao onClick={() => setEtapa(2)}>Próximo</Botao>
        </>
      )}

      {etapa === 2 && questaoAtual && (
        <>
          <QuestaoBox>
            <h2>{questaoAtual.titulo}</h2>
            <ul>
              {questaoAtual.alternativas.map((alt, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name="resposta"
                      checked={respostaSelecionada === i}
                      onChange={() => setRespostaSelecionada(i)}
                    />
                    {alt}
                  </label>
                </li>
              ))}
            </ul>
            {!acertou && <Botao onClick={verificarResposta}>Verificar</Botao>}
            {feedback && <Feedback>{feedback}</Feedback>}
            {acertou && <Botao onClick={avancarQuestao}>Avançar</Botao>}
          </QuestaoBox>
          <Botao onClick={() => navigate('/mapa')}>Voltar ao Mapa</Botao>
        </>
      )}
    </ContainerDesafio>
  );
}
