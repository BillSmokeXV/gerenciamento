import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './resetsenha.css';

import { auth } from '../Config/firebase';
import { sendPasswordResetEmail } from "firebase/auth"; // Importação correta

function ResetSenha(){

    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
     
    // Quando o usuario clicar para recuperar senha
     function recuperarSenha(e) {
        e.preventDefault(); //Impede comportamento inesperado do botao
        
        setMensagem('');
        if (!email) {
            setMensagem('Informe um e-mail válido.');
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Email de recuperação enviado com sucesso');
          setMensagem('Verifique sua caixa de entrada para redefinir sua senha');
        })
        .catch(erro => {
            console.log('Erro firebase', erro.code, erro.message);

            if (erro.code === 'auth/user-not-found') {
                setMensagem('Usúario não encontrado. Verifique o e-mail informado');
            } else if (erro.code === 'auth/invalid-email') {
                setMensagem('O e-mail informado não é válido.');
            } else if (erro.code === 'auth/network-request-failed') {
                setMensagem('Erro de conexão. Verifique sua internet.');
            } else {
                setMensagem('Erro ao enviar email:' + erro.message)
            }  
        });
     }

    return (
        <div className="d-flex align-items-center text-center form-container">
            <form className="form-signin">
                <img className="mb-4" src="/Images/roberto.jpg" width="70%" alt="Imagem de Login" />
                <h1 className="h3 mb-3 fw-normal">Recuperar Senha</h1>

                <div className="form-floating">
                    <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="E-mail" 
                    />
                    <label htmlFor="floatingInput">E-mail</label>
                </div>
               
                <button onClick={recuperarSenha} className="w-100 btn btn-lg btn-primary mt-3" type="button">Enviar</button>

                {mensagem.length > 0 && (<div className="alert alert-danger mt-2" role="alert">{mensagem}</div>
                )}

                <div className="login-links mt-5">
                  <Link to="/app/novaconta" className="mx-3">Criar uma conta.</Link>   
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Roberto Freires Silva</p>
            </form>
        </div>
    );
}

export default ResetSenha;
