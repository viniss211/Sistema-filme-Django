/**
 * AdminPage.js
 *
 * Página administrativa da aplicação onde é possível:
 * - Visualizar perguntas enviadas por usuários (pendentes e respondidas)
 * - Escrever e enviar respostas para perguntas pendentes
 * - Atualizar a lista de perguntas manualmente
 * - Sair da sessão administrativa
 *
 * Recursos:
 * - Busca de perguntas da API
 * - Filtragem por pendentes e respondidas
 * - Envio de resposta com feedback visual ("Aguarde..." e mensagens)
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

function AdminPage() {
  const [respostas, setRespostas] = useState({});
  const [mensagem, setMensagem] = useState('');
  const [pendentes, setPendentes] = useState([]);
  const [respondidas, setRespondidas] = useState([]);
  const [aguardandoResposta, setAguardandoResposta] = useState({});
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem('autenticado');
    navigate('/');
  };

  const buscarPerguntas = () => {
    fetch('/buscar-perguntas')
      .then(res => res.json())
      .then(data => {
        setPendentes(data.filter(p => !p.resposta));
        setRespondidas(data.filter(p => p.resposta));
      })
      .catch(err => console.error('Erro ao buscar perguntas:', err));
  };

  useEffect(() => {
    buscarPerguntas();
  }, []);

  const handleRespostaChange = (id, texto) => {
    setRespostas(prev => ({ ...prev, [id]: texto }));
  };

  const enviarResposta = async (id) => {
    const resposta = respostas[id];
    if (!resposta) return;

    setAguardandoResposta(prev => ({ ...prev, [id]: true }));
    setMensagem('');

    try {
      const res = await fetch('/responder-pergunta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, resposta })
      });

      if (res.ok) {
        setMensagem('Resposta enviada e arquivada com sucesso!');
        setPendentes(prev => prev.filter(p => p._id !== id));
        const pergunta = pendentes.find(p => p._id === id);
        if (pergunta) {
          setRespondidas(prev => [...prev, { ...pergunta, resposta }]);
        }
        setRespostas(prev => {
          const novo = { ...prev };
          delete novo[id];
          return novo;
        });
      } else {
        setMensagem('Erro ao enviar resposta.');
      }
    } catch (err) {
      console.error(err);
      setMensagem('Erro de conexão com o servidor.');
    } finally {
      setAguardandoResposta(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="admin-container">
      <h2>Painel Administrativo</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button className="botao-sair" onClick={sair}>Sair</button>
        <button className="botao-refresh" onClick={buscarPerguntas}>Atualizar perguntas</button>
      </div>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <h3>Perguntas Pendentes</h3>
      {pendentes.length === 0 && <p className="sem-perguntas">Sem perguntas pendentes.</p>}
      {pendentes.map(pergunta => (
        <div key={pergunta._id} className="card">
          <p><strong>De:</strong> {pergunta.nome} ({pergunta.email})</p>
          <p><strong>Pergunta:</strong> {pergunta.pergunta}</p>
          <textarea
            placeholder="Responder..."
            rows="3"
            value={respostas[pergunta._id] || ''}
            onChange={(e) => handleRespostaChange(pergunta._id, e.target.value)}
          />
          <button onClick={() => enviarResposta(pergunta._id)}>Enviar Resposta</button>
          {aguardandoResposta[pergunta._id] && (
            <p className="aguarde-msg">Aguarde...</p>
          )}
        </div>
      ))}

      <h3>Perguntas Respondidas</h3>
      {respondidas.length === 0 && <p className="sem-perguntas">Sem perguntas respondidas.</p>}
      {respondidas.map(pergunta => (
        <div key={pergunta._id} className="card">
          <p><strong>De:</strong> {pergunta.nome} ({pergunta.email})</p>
          <p><strong>Pergunta:</strong> {pergunta.pergunta}</p>
          <p><strong>Resposta:</strong> {pergunta.resposta}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
