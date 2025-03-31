/**
 * App.js
 *
 * Componente principal da aplicação.
 * Define o roteamento entre páginas usando React Router DOM.
 *
 * Rotas:
 * - "/" → Página de login (LoginPage)
 * - "/admin" → Painel administrativo (AdminPage)
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
