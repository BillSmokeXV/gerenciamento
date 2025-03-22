import React, { useState } from 'react';
import Navbar from '../Components/Navbar/navbar';
import './novocliente.css';
import { db } from '../Config/firebase';  // Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { getAuth } from "firebase/auth"; // Firebase Auth
import { Link, useNavigate } from 'react-router-dom'; 

function NovoCliente() {

    const [modelo, setModelo] = useState('');
    const [fone, setFone] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [data, setData] = useState('');
    const [placa, setPlaca] = useState('');
    const [valor, setValor] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('N');
    
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    // Função para cadastrar o cliente no Firestore
    async function CadastrarCliente() {
        if (!user) {
            setMensagem('Erro: Usuário não autenticado.');
            setSucesso('N');
            return;
        }

        // Validar os dados
        if (modelo === '' ||  fone === '' || empresa === '' || data === '' || placa === '' || valor === '') {
            setMensagem('Por favor, preencha todos os campos!');
            setSucesso('N');
            return;
        }

        try {
            await addDoc(collection(db, 'clientes'), {
                modelo: modelo,  // Campo atualizado
                fone: fone,
                empresa: empresa,
                data: data,
                placa: placa,
                valor: valor,
                uid: user.uid  // Associando ao usuário logado
            });

            setMensagem('');
            setSucesso('S');

            setTimeout(() => {
                navigate('/app/home');
            }, 2000);
        } catch (erro) {
            setMensagem('Erro ao cadastrar cliente: ' + erro.message);
            setSucesso('N');
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid titulo">
                <div className="offset-lg-3 col-lg-6">
                    <h1>Novo Cliente</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Modelo</label> {/* Campo Modelo */}
                            <input onChange={(e) => setModelo(e.target.value)} type="text" className="form-control" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Fone</label>
                            <input onChange={(e) => setFone(e.target.value)} type="number" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Empresa</label>
                            <input onChange={(e) => setEmpresa(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Placa</label>
                            <input onChange={(e) => setPlaca(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor (R$)</label>
                            <input onChange={(e) => setValor(e.target.value)} type="number" className="form-control" />
                        </div>

                        <div className="text-center">
                            <Link to="/app/home" type="button" className="btn btn-outline-primary btn-acao">Cancelar</Link>
                            <button onClick={CadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
                        </div>

                        {/* Exibir mensagens */}
                        {mensagem.length > 0 && <div className="alert alert-danger mt-2">{mensagem}</div>}
                        {sucesso === 'S' && <div className="alert alert-success mt-2">Cadastro realizado com sucesso! Redirecionando...</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NovoCliente;
