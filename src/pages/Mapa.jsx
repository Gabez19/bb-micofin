import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Cabecalho from '../components/Cabecalho';
import MapaIlhas from '../components/MapaIlhas';
import '../components/Cabecalho.css';
import '../components/TituloFase.css';

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
    return (
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p>Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f7fa'
    }}>
      <Cabecalho xp={xp} micoins={moedas} />
      
      <main style={{ 
        marginTop: '56px',
        padding: '20px 0',
        flex: 1
      }}>
        <div className='titulo-fase'>
          <h1 style={{ color: '#465EFF', marginBottom: '8px' }}>Jardim do Início</h1>
          <p style={{ 
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Complete as ilhas em ordem para desbloquear novos desafios.
            A ilha com <span style={{ fontWeight: 'bold' }}>★</span> é a fase bônus!
          </p>
        </div>
        
        <div style={{ 
          margin: '40px auto',
          position: 'relative'
        }}>
          <MapaIlhas />
        </div>
      </main>
    </div>
  );
}