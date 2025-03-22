import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import './listacliente.css';

function ListaClientes({ arrayClientes = [], onDelete }) {
    const [pagos, setPagos] = useState({});

    const togglePagamento = (id) => {
        setPagos((prevPagos) => ({
            ...prevPagos,
            [id]: !prevPagos[id],
        }));
    };

    // Ordena os clientes por data (mais recente primeiro)
    const clientesOrdenados = [...arrayClientes].sort((a, b) => {
        return new Date(b.data) - new Date(a.data);
    });

    return (
        <>
            {clientesOrdenados.length === 0 ? (
                <div className="alert alert-warning text-center">
                    Nenhum cliente encontrado.
                </div>
            ) : (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col">Código</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Modelo Veículo</th>
                            <th scope="col">Placa</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesOrdenados.map((cliente) => (
                            <tr key={cliente.id}>
                                <th scope="row">{cliente.id}</th>
                                <td>{cliente.empresa}</td>
                                <td>{cliente.modelo}</td>
                                <td>{cliente.placa}</td>
                                <td
                                    style={{
                                        backgroundColor: pagos[cliente.id] ? '#d4edda' : 'transparent',
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    {cliente.valor}
                                    <FontAwesomeIcon
                                        icon={pagos[cliente.id] ? faSquareCheck : faSquare}
                                        onClick={() => togglePagamento(cliente.id)}
                                        style={{
                                            marginLeft: '10px',
                                            cursor: 'pointer',
                                            color: pagos[cliente.id] ? 'green' : '#555',
                                        }}
                                    />
                                </td>
                                <td>{cliente.fone}</td>
                                <td>{cliente.data}</td>
                                <td>
                                    <Link to={`/app/editarcliente/${cliente.id}`}>
                                        <i className="fa-solid fa-pen-to-square icone-acao"></i>
                                    </Link>
                                    <button
                                        onClick={() => onDelete(cliente.id)}
                                        className="btn btn-link icone-acao"
                                    >
                                        <i className="fa-solid fa-trash icone-acao red"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default ListaClientes;
