import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Site from './site/site.jsx';
import Login from './app/Login/login.jsx';
import NovaConta from './app/NovaConta/novaconta.jsx';
import ResetSenha from './app/ResetSenha/resetsenha.jsx';
import Home from './app/Home/home.jsx';
import NovoCliente from './app/NovoCliente/novocliente.jsx';
import EditarCliente from './app/EditarCliente/editarcliente.jsx';
import RotaPrivada from './app/Context/RotaPrivada.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<Site />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app/novaconta" element={<NovaConta />} />
                <Route path="/app/resetsenha" element={<ResetSenha />} />
                
                <Route path="/app/home"element={<RotaPrivada><Home/></RotaPrivada>} />
                <Route path="/app/novocliente"element={<RotaPrivada><NovoCliente /></RotaPrivada>} />
                <Route path="/app/editarcliente/:id" element={<RotaPrivada><EditarCliente /></RotaPrivada>} />
            </Routes>
            </BrowserRouter>
    );
}

export default App;
