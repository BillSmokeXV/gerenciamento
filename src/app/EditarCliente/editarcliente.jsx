import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/navbar';
import './editarcliente.css';
import { db } from '../Config/firebase';
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditarCliente() {
    const [modelo, setModelo] = useState('');
    const [fone, setFone] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [data, setData] = useState('');
    const [placa, setPlaca] = useState('');
    const [valor, setValor] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('N');
    
    const navigate = useNavigate();
    const { id } = useParams();
    const auth = getAuth();
    const user = auth.currentUser;

    // Buscar dados do cliente
    useEffect(() => {
        async function fetchCliente() {
            if (!user) {
                setMensagem("Erro: Usuário não autenticado.");
                return;
            }

            try {
                const clienteRef = doc(db, 'clientes', id);
                const resultado = await getDoc(clienteRef);

                if (resultado.exists()) {
                    const clienteData = resultado.data();

                    // Verificar se o cliente pertence ao usuário logado
                    if (clienteData.uid === user.uid) {
                        setModelo(clienteData.modelo);  // Campo atualizado
                        setFone(clienteData.fone);
                        setEmpresa(clienteData.empresa);
                        setData(clienteData.data);
                        setPlaca(clienteData.placa);
                        setValor(clienteData.valor);
                    } else {
                        setMensagem("Erro: Você não tem permissão para editar este cliente.");
                    }
                } else {
                    setMensagem('Cliente não encontrado.');
                }
            } catch (erro) {
                setMensagem('Erro ao buscar cliente: ' + erro.message);
            }
        }
        fetchCliente();
    }, [id, user]);

    // Atualizar cliente
    async function atualizarCliente() {
        if (modelo === '' || fone === '' || empresa === '' || data === '' || placa === '' || valor === '') {
            setMensagem('Por favor, preencha todos os campos!');
            setSucesso('N');
            return;
        }

        try {
            const clienteRef = doc(db, 'clientes', id);
            await updateDoc(clienteRef, { modelo, fone, empresa, data, placa, valor });

            setMensagem('');
            setSucesso('S');

            setTimeout(() => {
                navigate('/app/home');
            }, 2000);
        } catch (erro) {
            setMensagem('Erro ao atualizar cliente: ' + erro.message);
            setSucesso('N');
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid titulo">
                <div className="offset-lg-3 col-lg-6">
                    <h1>Editar Cliente</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Modelo Veículo</label> {/* Campo Modelo */}
                            <input onChange={(e) => setModelo(e.target.value)} value={modelo} type="text" className="form-control" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Fone</label>
                            <input onChange={(e) => setFone(e.target.value)} value={fone} type="number" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Empresa</label>
                            <input onChange={(e) => setEmpresa(e.target.value)} value={empresa} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data</label>
                            <input onChange={(e) => setData(e.target.value)} value={data} type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Placa</label>
                            <input onChange={(e) => setPlaca(e.target.value)} value={placa} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor (R$)</label>
                            <input onChange={(e) => setValor(e.target.value)} value={valor} type="number" className="form-control" />
                        </div>

                        <button onClick={atualizarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarCliente;
