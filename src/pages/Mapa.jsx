import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Cabecalho from '../components/Cabecalho';
import MapaIlhas from '../components/MapaIlhas';
import './Mapa.css'; // Importe o CSS específico

export default function Mapa() {
  const [xp, setXp] = useState(0);
  const [moedas, setMoedas] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      const usuario = auth.currentUser;
      if (!usuario) {
        setCarregando(false);
        return;
      }

      try {
        const docRef = doc(db, 'usuarios', usuario.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const dados = snapshot.data();
          setXp(dados.xp || 0);
          setMoedas(dados.moedas || 0);
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setCarregando(false);
      }
    };

    fetchDadosUsuario();
  }, []);

  if (carregando) {
    return <div className="carregando-mapa">Carregando...</div>;
  }

  return (
    <div className="container-mapa-completo">
      <Cabecalho xp={xp} micoins={moedas} />
      
      <div className="conteudo-principal-mapa">
        <h1 className="titulo-fase-mapa">Jardim do Início</h1>
        <p className="descricao-fase">
          Complete as ilhas em ordem para desbloquear novos desafios.
          A ilha com <span className="destaque-boss">★</span> é a fase bônus!
        </p>
        
        <div className="container-mapa-ilhas">
          <MapaIlhas />
        </div>
      </div>
    </div>
  );
}