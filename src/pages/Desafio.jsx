// src/pages/Desafio.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const ContainerDesafio = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const VideoAula = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  margin: 20px 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Questao = styled.div`
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export default function Desafio() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { desafio, ilhaId } = state || {};

  if (!desafio) {
    return (
      <ContainerDesafio>
        <h2>Desafio não encontrado</h2>
        <button onClick={() => navigate('/mapa')}>Voltar ao Mapa</button>
      </ContainerDesafio>
    );
  }

  return (
    <ContainerDesafio>
      <h1>Desafio da Ilha {ilhaId}: {desafio.titulo}</h1>
      <p>{desafio.descricao}</p>

      {desafio.link_video && (
        <VideoAula>
          <iframe 
            src={`https://www.youtube.com/embed/${extrairIdYoutube(desafio.link_video)}`} 
            title="Video aula"
            allowFullScreen
          />
        </VideoAula>
      )}

      <h2>Questões ({desafio.questoes.length})</h2>
      {desafio.questoes.map((questao, index) => (
        <Questao key={index}>
          <h3>{index + 1}. {questao.titulo}</h3>
          <ul>
            {questao.alternativas.map((alt, i) => (
              <li key={i}>
                <label>
                  <input type="radio" name={`questao-${index}`} />
                  {alt}
                </label>
              </li>
            ))}
          </ul>
        </Questao>
      ))}

      <button onClick={() => navigate('/mapa')}>Voltar ao Mapa</button>
    </ContainerDesafio>
  );
}

// Helper para extrair ID do YouTube (se necessário)
function extrairIdYoutube(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}