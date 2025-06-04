import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const ContainerMapa = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: url('/images/background-map.png') no-repeat center;
  background-size: contain;
`;

const IlhaEstilizada = styled.div`
  position: absolute;
  width: ${props => props.isBoss ? '60px' : '45px'};
  height: ${props => props.isBoss ? '60px' : '45px'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${props => {
    if (props.isBoss) return '#FF5722';
    return props.concluida ? '#4CAF50' : '#9E9E9E';
  }};
  transform: translate(-50%, -50%);
  cursor: ${props => (props.disponivel || props.concluida) ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: ${props => (props.disponivel || props.concluida) 
      ? 'translate(-50%, -50%) scale(1.1)' 
      : 'translate(-50%, -50%)'};
  }


  @keyframes pulse {
    0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
    100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  }
`;

const NomeIlha = styled.span`
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-size: ${props => props.isBoss ? '14px' : '11px'};
`;

const LinhaConexao = styled.div`
  position: absolute;
  background-color: ${props => props.ativa ? '#4CAF50' : '#757575'};
  height: 2px;
  z-index: 1;
  transform-origin: 0 0;
`;

const MapaIlhas = ({ ilhasConcluidas = [] }) => {
  const [ilhas, setIlhas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        // Padrão de escada compacto
        const posicoesEscada = [
          { top: '12%', left: '50%' },   // 1
          { top: '22%', left: '60%' },   // 2
          { top: '32%', left: '50%' },   // 3 
          { top: '42%', left: '60%' },   // 4
          { top: '52%', left: '50%' },   // 5
          { top: '62%', left: '60%' },   // 6
          { top: '72%', left: '50%' },   // 7
          { top: '80%', left: '60%' },   // 8
          { top: '88%', left: '50%' },   // 9
          { top: '94%', left: '50%' }    // 10 (Boss)
        ];

        const ilhasAtualizadas = data.ilhas.map((ilha, index) => ({
          ...ilha,
          top: posicoesEscada[index].top,
          left: posicoesEscada[index].left,
          concluida: ilhasConcluidas.includes(ilha.id),
          disponivel: verificarDisponibilidade(ilha, data.ilhas, ilhasConcluidas)
        }));
        
        setIlhas(ilhasAtualizadas);
      })
      .catch(error => {
        console.error('Erro ao carregar o mapa:', error);
        setIlhas([]);
      });
  }, [ilhasConcluidas]);

  const verificarDisponibilidade = (ilhaAtual, todasIlhas, concluidas) => {
    if (ilhaAtual.id === 1) return true;
    const ilhaAnterior = todasIlhas.find(i => i.id === ilhaAtual.id - 1);
    return ilhaAnterior && concluidas.includes(ilhaAnterior.id);
  };

  const handleCliqueIlha = (ilha) => {
    if (ilha.disponivel || ilha.concluida) {
      navigate(`/desafio/${ilha.id}`, { 
        state: { 
          desafio: ilha.desafio,
          ilhaId: ilha.id,
          isBoss: ilha.isBoss 
        } 
      });
    }
  };

  const gerarLinhasConexao = () => {
    return ilhas.reduce((acc, ilha, index) => {
      if (index < ilhas.length - 1 && ilha.concluida) {
        const proximaIlha = ilhas[index + 1];
        const distancia = Math.sqrt(
          Math.pow(parseFloat(proximaIlha.left) - parseFloat(ilha.left), 2) +
          Math.pow(parseFloat(proximaIlha.top) - parseFloat(ilha.top), 2)
        );
        const angulo = Math.atan2(
          parseFloat(proximaIlha.top) - parseFloat(ilha.top),
          parseFloat(proximaIlha.left) - parseFloat(ilha.left)
        ) * 180 / Math.PI;

        acc.push({
          id: `linha-${ilha.id}-${proximaIlha.id}`,
          from: ilha,
          to: proximaIlha,
          distancia,
          angulo,
          ativa: proximaIlha.concluida
        });
      }
      return acc;
    }, []);
  };

  if (ilhas.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px'
      }}>
        <p>Carregando mapa...</p>
      </div>
    );
  }

  return (
    <ContainerMapa>
      {gerarLinhasConexao().map((linha) => (
        <LinhaConexao
          key={linha.id}
          ativa={linha.ativa}
          style={{
            width: `${linha.distancia * 0.8}%`,
            left: `${linha.from.left}`,
            top: `${linha.from.top}`,
            transform: `translate(0, -50%) rotate(${linha.angulo}deg)`
          }}
        />
      ))}

      {ilhas.map((ilha) => (
        <IlhaEstilizada
          key={ilha.id}
          style={{ 
            top: ilha.top, 
            left: ilha.left 
          }}
          concluida={ilha.concluida}
          disponivel={ilha.disponivel}
          isBoss={ilha.isBoss}
          onClick={() => handleCliqueIlha(ilha)}
        >
          <NomeIlha isBoss={ilha.isBoss}>
            {ilha.isBoss ? '★' : ilha.nome}
          </NomeIlha>
        </IlhaEstilizada>
      ))}
    </ContainerMapa>
  );
};

export default MapaIlhas;