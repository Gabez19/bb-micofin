import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Cabecalho({ xp: propXp, micoins: propMicoins }) {
  const [userData, setUserData] = useState({ xp: 0, micoins: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, "usuarios", auth.currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            
            // Debug - vamos ver todos os campos disponíveis
            console.log("Dados do usuário:", data);
            console.log("Campos disponíveis:", Object.keys(data));
            
            setUserData({
              // Tenta diferentes variações do nome do campo XP
              xp: data.xp || data.XP || data.experiencia || data.exp || 0,
              // Tenta diferentes variações do nome do campo MiCoins
              micoins: data.micoins || data.miCoins || data.MiCoins || data.moedas || 0
            });
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    // Se não recebeu props, busca do banco
    if (propXp === undefined || propMicoins === undefined) {
      // Escuta mudanças no estado de autenticação
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          fetchUserData();
        }
      });

      return () => unsubscribe();
    }
  }, [propXp, propMicoins]);

  // Usa as props se foram passadas, senão usa os dados buscados
  const displayXp = propXp !== undefined ? propXp : userData.xp;
  const displayMicoins = propMicoins !== undefined ? propMicoins : userData.micoins;

  return (
    <header className="top-header">
      <div className="header-container">
        <div className="xp">
          <img src="/icons/xp-icon.svg" alt="XP" />
          <span>{displayXp}</span>
        </div>
        <div className="micoins">
          <img src="/icons/micoin-icon.svg" alt="MiCoins" />
          <span>{displayMicoins}</span>
        </div>
      </div>
    </header>
  );
}