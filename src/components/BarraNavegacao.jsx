import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BarraNavegacao.css';

export default function BarraNavegacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemAtivo, setItemAtivo] = useState('');

  // Atualiza o item ativo baseado na URL atual
  useEffect(() => {
    const caminho = location.pathname.split('/')[1]; // pega a primeira parte da URL
    setItemAtivo(caminho || 'mapa'); // padrão é 'mapa'
  }, [location]);

  const itens = [
    { 
      id: 'mapa', 
      iconeDefault: '/icons/map-default.svg', 
      iconeActive: '/icons/map-active.svg',
      rotulo: 'Mapa' 
    },
    { 
      id: 'missoes', 
      iconeDefault: '/icons/target-default.svg',
      iconeActive: '/icons/target-active.svg',
      rotulo: 'Missoes' 
    },
    { 
      id: 'recompensas', 
      iconeDefault: '/icons/medal-default.svg',
      iconeActive: '/icons/medal-active.svg',
      rotulo: 'Recompensas' 
    },
    { 
      id: 'estatisticas', 
      iconeDefault: '/icons/chart-default.svg',
      iconeActive: '/icons/chart-active.svg',
      rotulo: 'Estatisticas' 
    },
    { 
      id: 'configuracoes', 
      iconeDefault: '/icons/config-default.svg',
      iconeActive: '/icons/config-active.svg',
      rotulo: 'Configuracoes' 
    }
  ];

  const handleClick = (id) => {
    console.log('Clicou em:', id); // Debug
    console.log('Navegando para:', `/${id}`); // Debug
    setItemAtivo(id);
    navigate(`/${id}`);
  };

  return (
    <nav className="barra-navegacao">
      {itens.map(item => (
        <button
          key={item.id}
          className={`botao-nav ${itemAtivo === item.id ? 'ativo' : ''}`}
          onClick={() => handleClick(item.id)}
          aria-label={item.rotulo}
        >
          <div className="icone-container">
            <img 
              src={itemAtivo === item.id ? item.iconeActive : item.iconeDefault} 
              alt=""
              className="icone-nav"
            />
          </div>
          {itemAtivo === item.id && (
            <span className="rotulo-nav">{item.rotulo}</span>
          )}
        </button>
      ))}
    </nav>
  );
}