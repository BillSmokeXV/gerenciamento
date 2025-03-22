import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';  // Importar as funções do Firebase
import './navbar.css';

function Navbar() {
  const navigate = useNavigate(); // Usando o hook useNavigate para redirecionar

  // Função para logout
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      // Desconectar o usuário
      await signOut(auth);
      // Redirecionar para a página de login
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img src="/Images/roberto.jpg" alt="" width="120" height="80" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/app/home" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/app/novocliente" className="nav-link" aria-current="page">Novo Cliente</Link>
            </li>
            {/* Botão de logout */}
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
