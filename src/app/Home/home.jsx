import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/navbar';
import ListaClientes from '../Components/ListaClientes/listacliente';
import './home.css';

import { db } from '../Config/firebase';
import { getAuth } from "firebase/auth"; // Importando autenticação
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";

import clientesPDF from '../Reports/Clientes/clientes';

function Home() {
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState("");
    const [texto, setTexto] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.error("Usuário não autenticado!");
            navigate('/login');
            return;
        }

        const fetchClientes = async () => {
            try {
                const q = query(collection(db, "clientes"), where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("Nenhum cliente encontrado para o usuário.");
                    return;
                }

                const listaClientes = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(cliente => cliente.modelo.toLowerCase().includes(busca.toLowerCase()));

                // Ordena os clientes por data (mais recente primeiro)
                const listaOrdenada = [...listaClientes].sort((a, b) => {
                    return new Date(b.data) - new Date(a.data);
                });

                setClientes(listaOrdenada);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, [busca, user, navigate]);

    const excluirCliente = async (id) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente?");
        if (confirmacao) {
            try {
                await deleteDoc(doc(db, "clientes", id));
                alert("Cliente excluído com sucesso!");
                setClientes(clientes.filter(cliente => cliente.id !== id));
            } catch (error) {
                console.error("Erro ao excluir cliente:", error);
                alert("Erro ao excluir cliente. Tente novamente.");
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container-fluid titulo">
                <h1>Atendimentos Pronta Resposta</h1>

                <div className="row">
                    <div className="col-4">
                        <Link to='/app/novocliente' className="btn btn btn-primary btn-cli" type="button">
                            <i className="fa-solid fa-plus"></i> Atendimento
                        </Link>
                        <button onClick={() => clientesPDF(clientes)} 
                                className="btn btn-danger btn-cli" 
                                type="button" 
                                id="button-addon2">
                            <i className="far fa-file-pdf"></i> Gerar PDF
                        </button>
                   </div>

                    <div className="col-8">
                        <div className="input-group mb-3">
                            <input 
                                onChange={(e) => setTexto(e.target.value)} 
                                type="text" 
                                className="form-control" 
                                placeholder="Pesquisar por modelo" 
                                aria-describedby="button-addon2" 
                            />
                            <button 
                                onClick={() => setBusca(texto)} 
                                className="btn btn-primary" 
                                type="button" 
                                id="button-addon2"
                            >
                                <i className="fas fa-search"></i> Pesquisar
                            </button>
                        </div>
                    </div>
                </div>

                <ListaClientes arrayClientes={clientes} onDelete={excluirCliente} />
            </div>
        </div>
    );
}

export default Home;
