// Local: /src/components/EditarPerfil.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Ajuste o caminho se necessário
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditarPerfil({ onBack }) {
  const [formData, setFormData] = useState({
    apelido: '',
    dataNascimento: '',
    genero: '',
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Busca os dados do usuário ao carregar o componente
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'usuarios', auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData({
            apelido: data.apelido || '',
            dataNascimento: data.dataNascimento || '',
            genero: data.genero || '',
          });
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    if (!auth.currentUser) {
      setFeedback({ type: 'error', message: 'Você precisa estar logado.' });
      setLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, 'usuarios', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        apelido: formData.apelido,
        dataNascimento: formData.dataNascimento,
        genero: formData.genero,
      });
      setFeedback({ type: 'success', message: 'Perfil atualizado com sucesso!' });
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      setFeedback({ type: 'error', message: 'Falha ao atualizar o perfil. Tente novamente.' });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-group">
        <label htmlFor="apelido">Apelido</label>
        <input
          type="text"
          id="apelido"
          name="apelido"
          className="form-input"
          value={formData.apelido}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          className="form-input"
          value={formData.dataNascimento}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="genero">Gênero</label>
        <select
          id="genero"
          name="genero"
          className="form-input"
          value={formData.genero}
          onChange={handleChange}
        >
          <option value="">Prefiro não informar</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {feedback.message && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <div className="form-actions">
        <button type="button" onClick={onBack} className="btn btn-secondary">
          Voltar
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}