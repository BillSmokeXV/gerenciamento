import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importação correta
import './novaconta.css';

import { auth, db } from '../Config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; // Firestore

function NovaConta() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState(false); // Estado para o sucesso
    const navigate = useNavigate(); // Hook para redirecionamento

    async function cadastrarUsuario(e) {
        e.preventDefault(); 

        setMensagem('');
        setSucesso(false);

        if (!email || !senha) {
            setMensagem('Informe todos os campos');
            return;
        }

        try {
            // Criando usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            // Salvando dados adicionais no Firestore
            await setDoc(doc(collection(db, "usuarios"), user.uid), {
                email: user.email,
                criadoEm: new Date().toISOString()
            });

            setSucesso(true);
            setMensagem('');
            setEmail('');
            setSenha('');

            // Redirecionamento
            setTimeout(() => {
                navigate('/app/home');
            }, 2000);
        } catch (erro) {
            if (erro.message.includes('Password should be at least 6 characters')) {
                setMensagem('A senha deve ter pelo menos 6 caracteres');
            } else if (erro.message.includes('email-already-in-use')) {
                setMensagem('Este e-mail já está cadastrado. Tente outro.');
            } else if (erro.message.includes('invalid-email')) {
                setMensagem('Formato de e-mail inválido.');
            } else {
                setMensagem('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        }
    }

    return (
        <div className="d-flex align-items-center text-center form-container">
            <form className="form-signin" onSubmit={cadastrarUsuario}>
                <img className="mb-4" src="/Images/roberto.jpg" width="70%" alt="Imagem de Login" />
                <h1 className="h3 mb-3 fw-normal">Criar Conta</h1>

                <div className="form-floating">
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="E-mail" 
                        autoComplete="username"
                    />
                    <label htmlFor="floatingInput">E-mail</label>
                </div>
                <div className="form-floating">
                    <input 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Senha" 
                        autoComplete="current-password"
                    />
                    <label htmlFor="floatingPassword">Senha</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Criar Conta</button>

                {/* Exibir mensagem de erro */}
                {mensagem.length > 0 && <div className="alert alert-danger mt-2" role="alert">{mensagem}</div>}

                {/* Exibir mensagem de sucesso */}
                {sucesso && <div className="alert alert-success mt-2" role="alert">Cadastro realizado com sucesso! Redirecionando...</div>}
                
                <div className="login-links mt-5">
                    <Link to="/login" className="mx-3">Já tenho uma conta.</Link>   
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; Desenvolvido por Roberto Freires Silva</p>
            </form>
        </div>
    );
}

export default NovaConta;