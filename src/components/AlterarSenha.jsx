// Local: /src/components/AlterarSenha.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Ajuste o caminho se necessário
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default function AlterarSenha({ onBack }) {
  const [formData, setFormData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: '',
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    if (formData.novaSenha !== formData.confirmarNovaSenha) {
      setFeedback({ type: 'error', message: 'As novas senhas não coincidem.' });
      setLoading(false);
      return;
    }
    
    if(formData.novaSenha.length < 6) {
      setFeedback({ type: 'error', message: 'A nova senha deve ter no mínimo 6 caracteres.' });
      setLoading(false);
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setFeedback({ type: 'error', message: 'Nenhum usuário logado.' });
      setLoading(false);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, formData.senhaAtual);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, formData.novaSenha);

      setFeedback({ type: 'success', message: 'Senha alterada com sucesso!' });
      setFormData({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });

    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      let errorMessage = 'Ocorreu um erro. Tente novamente.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'A senha atual está incorreta.';
      }
      setFeedback({ type: 'error', message: errorMessage });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-group">
        <label htmlFor="senhaAtual">Senha Atual</label>
        <input
          type="password"
          id="senhaAtual"
          name="senhaAtual"
          className="form-input"
          value={formData.senhaAtual}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="novaSenha">Nova Senha</label>
        <input
          type="password"
          id="novaSenha"
          name="novaSenha"
          className="form-input"
          value={formData.novaSenha}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
        <input
          type="password"
          id="confirmarNovaSenha"
          name="confirmarNovaSenha"
          className="form-input"
          value={formData.confirmarNovaSenha}
          onChange={handleChange}
          required
        />
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
          {loading ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </div>
    </form>
  );
}