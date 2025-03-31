/**
 * LoginPage.js
 *
 * Página de login da aplicação administrativa.
 * Permite que o administrador entre com email e senha.
 * Em caso de sucesso, redireciona para a página de administração.
 *
 * Recursos:
 * - Campos controlados para email e senha
 * - Validação simples no front-end
 * - Requisição POST para autenticação via API
 * - Armazenamento de token simples no localStorage
 * - Exibição de mensagens de erro
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      if (response.ok) {
        localStorage.setItem('autenticado', 'true');
        navigate('/admin');
      } else {
        const erroData = await response.json();
        setErro(erroData.erro || 'Erro ao fazer login.');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p>{erro}</p>}
    </div>
  );
}

export default LoginPage;
