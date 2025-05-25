import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Cabecalho from '../components/Cabecalho';

export default function Mapa() {
  const [xp, setXp] = useState(0);
  const [moedas, setMoedas] = useState(0);

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      const usuario = auth.currentUser;
      if (!usuario) return;

      try {
        const docRef = doc(db, 'usuarios', usuario.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const dados = snapshot.data();
          setXp(dados.xp || 0);
          setMoedas(dados.moedas || 0);
        } else {
          console.warn('Usuário não encontrado no Firestore.');
        }
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    };

    fetchDadosUsuario();
  }, []);

  return (
    <div className="mapa-container">
      <Cabecalho xp={xp} micoins={moedas} />
      <main style={{ padding: '20px', marginTop: '56px' }}>
        {/* conteúdo do mapa aqui */}
      </main>
    </div>
  );
}