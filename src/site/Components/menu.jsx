import React from 'react';

function Menu(){
    return <nav className="navbar fixed-top navbar-expand-md navbar-dark">

    <div className="container">
      <a className="navbar-brand" href="/#">
        <img src="Images/roberto.jpg" alt="" width="60" height="40" />
      </a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#banner">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#features">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#testemunho">Clientes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#precos">Planos e Preços</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#footer">Contato</a>
          </li>
          </ul>
        </div>
        </div>
  </nav>;
  }

export default Menu;