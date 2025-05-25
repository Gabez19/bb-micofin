import React from 'react';
import styled from '@emotion/styled';

const ContainerMapa = styled.div`
  position: relative;
  height: 650px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: url('/background-map.png') no-repeat center;
  background-size: contain;
`;

const IlhaEstilizada = styled.div`
  position: absolute;
  width: ${props => props.isBoss ? '70px' : '50px'};
  height: ${props => props.isBoss ? '70px' : '50px'};
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
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border: 2px dashed ${props => props.disponivel ? '#465EFF' : 'transparent'};
    border-radius: 50%;
    animation: ${props => props.disponivel ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
    100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  }
`;

const NomeIlha = styled.span`
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-size: ${props => props.isBoss ? '16px' : '12px'};
`;

const LinhaConexao = styled.div`
  position: absolute;
  background-color: #757575;
  z-index: 1;
`;

const MapaIlhas = () => {
    const ilhas = [
        { id: 1, nome: "1", top: "15%", left: "30%", concluida: true, disponivel: false },
        { id: 2, nome: "2", top: "30%", left: "70%", concluida: false, disponivel: true },
        { id: 3, nome: "3", top: "45%", left: "30%", concluida: false, disponivel: false },
        { id: 4, nome: "4", top: "60%", left: "70%", concluida: false, disponivel: false },
        { id: 5, nome: "5", top: "75%", left: "30%", concluida: false, disponivel: false },
        { id: 6, nome: "6", top: "90%", left: "70%", concluida: false, disponivel: false },
        { id: 7, nome: "7", top: "105%", left: "30%", concluida: false, disponivel: false },
        { id: 8, nome: "8", top: "120%", left: "70%", concluida: false, disponivel: false },
        { id: 9, nome: "9", top: "135%", left: "30%", concluida: false, disponivel: false },
        { id: 10, nome: "★", top: "150%", left: "70%", concluida: false, disponivel: false, isBoss: true }
    ];

    // Gerar linhas de conexão
    const linhas = [];
    for (let i = 0; i < ilhas.length - 1; i++) {
        if (ilhas[i].concluida) {
            linhas.push({
                id: `linha-${i}`,
                from: ilhas[i],
                to: ilhas[i + 1]
            });
        }
    }

    return (
        <ContainerMapa>
            {/* Linhas de conexão */}
            {linhas.map((linha) => {
                const distancia = Math.sqrt(
                    Math.pow(parseInt(linha.to.left) - parseInt(linha.from.left), 2) +
                    Math.pow(parseInt(linha.to.top) - parseInt(linha.from.top), 2)
                );
                const angulo = Math.atan2(
                    parseInt(linha.to.top) - parseInt(linha.from.top),
                    parseInt(linha.to.left) - parseInt(linha.from.left)
                ) * 180 / Math.PI;

                return (
                    <LinhaConexao
                        key={linha.id}
                        style={{
                            width: `${distancia * 0.7}%`,
                            height: '2px',
                            left: `${linha.from.left}`,
                            top: `${linha.from.top}`,
                            transform: `translate(0, -50%) rotate(${angulo}deg)`,
                            transformOrigin: '0 0'
                        }}
                    />
                );
            })}

            {/* Ilhas */}
            {ilhas.map((ilha) => (
                <IlhaEstilizada
                    key={ilha.id}
                    style={{ 
                        top: ilha.top, 
                        left: ilha.left,
                    }}
                    concluida={ilha.concluida}
                    disponivel={ilha.disponivel}
                    isBoss={ilha.isBoss}
                    onClick={() => {
                        if (ilha.concluida || ilha.disponivel) {
                            console.log(`Ilha ${ilha.nome} clicada!`);
                            // Navegar para a fase correspondente
                        }
                    }}
                >
                    <NomeIlha isBoss={ilha.isBoss}>{ilha.nome}</NomeIlha>
                </IlhaEstilizada>
            ))}
        </ContainerMapa>
    );
};

export default MapaIlhas;