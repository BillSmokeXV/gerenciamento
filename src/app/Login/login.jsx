import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correção: useNavigate ao invés de Redirect
import './login.css';

import { auth } from '../Config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    function LoginUsuario() {
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                localStorage.setItem("logado", "S");
                setSucesso('S');
                navigate('/app/home'); // Redirecionamento correto
            })
            .catch(() => {
                localStorage.setItem("logado", "N");
                setSucesso('N');
            });
    }  

    function alterarEmail(event) {
        setEmail(event.target.value);
    }

    function alterarSenha(event) {
        setSenha(event.target.value);
    }

    return (
        <div className="d-flex align-items-center text-center form-container">
            <form className="form-signin">
                <img className="mb-4" src="Images/roberto.jpg" width="70%" alt="Imagem de Login" />
                <h1 className="h3 mb-3 fw-normal">Login</h1>
                
                <div className="form-floating">
                    <input onChange={alterarEmail} type="email" className="form-control" id="floatingInput" placeholder="E-mail" autoComplete="username" />
                    <label htmlFor="floatingInput">E-mail</label>
                </div>
                <div className="form-floating">
                    <input 
                    onChange={alterarSenha} type="password" className="form-control" id="current-password" placeholder="Senha" autoComplete="current-password"/>
                    <label htmlFor="floatingPassword">Senha</label>
                </div>

                <button onClick={LoginUsuario} className="w-100 btn btn-lg btn-primary" type="button">Acessar</button>
                
                {sucesso === 'N' && <div className="alert alert-danger mt-2" role="alert">E-mail ou senha inválida.</div>}

                <div className="login-links mt-5">
                    <Link to="/app/resetsenha" className="mx-3">Esqueci minha senha</Link>
                    <Link to="/app/novaconta" className="mx-3">Criar uma conta</Link>   
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Roberto Freires Silva</p>
            </form>
        </div>
    );
}

export default Login;
