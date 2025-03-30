import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';


function AdminPage() {
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [mensagem, setMensagem] = useState('');

  // Buscar perguntas ao carregar a página
  useEffect(() => {
    fetch('/buscar-perguntas')
      .then(res => res.json())
      .then(data => {
        console.log('Dados recebidos da API:', data); // 👈 debug
        setPerguntas(data);
      })
      .catch(err => console.error('Erro ao buscar perguntas:', err));
  }, []);

  // Atualizar campo de resposta
  const handleRespostaChange = (id, texto) => {
    setRespostas(prev => ({ ...prev, [id]: texto }));
  };

  // Enviar resposta
  const enviarResposta = async (id) => {
    const resposta = respostas[id];
    if (!resposta) return;

    try {
      const res = await fetch('/responder-pergunta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, resposta })
      });

      if (res.ok) {
        setMensagem('Resposta enviada com sucesso!');
        const novasPerguntas = perguntas.map(p =>
          p.id === id ? { ...p, resposta } : p
        );
        setPerguntas(novasPerguntas);
      } else {
        setMensagem('Erro ao enviar resposta.');
      }
    } catch (err) {
      console.error(err);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Painel Administrativo</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      {perguntas.length === 0 && <p className="sem-perguntas">Nenhuma pergunta cadastrada.</p>}
      {perguntas.map(pergunta => (
        <div key={pergunta.id} className="card">
          <p><strong>De:</strong> {pergunta.nome} ({pergunta.email})</p>
          <p><strong>Pergunta:</strong> {pergunta.pergunta}</p>
          {pergunta.resposta ? (
            <p><strong>Resposta:</strong> {pergunta.resposta}</p>
          ) : (
            <>
              <textarea
                placeholder="Responder..."
                rows="3"
                value={respostas[pergunta.id] || ''}
                onChange={(e) => handleRespostaChange(pergunta.id, e.target.value)}
              />
              <button onClick={() => enviarResposta(pergunta.id)}>Enviar Resposta</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
