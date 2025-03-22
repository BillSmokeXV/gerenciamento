import React from 'react';

function Precos() {
    return (
        <section id="precos">
            <div className="container">                          
                          
                <div className="row text-center">
                    <div className="titulo">
                        <h1>Planos e Preços</h1>
                        <p>Comece sua avaliação gratuita. Não é necessário cartão de crédito.</p>
                    </div>
                </div>   
                
                <div className="row text-center">
                <div className="col-lg-4">
                    <div className="card"> <h1>Free</h1></div>
                    <div className="card-body">
                        <h2>R$ 0,00<small className="text-muted">/mês</small></h2>
                         <p>Até 50 clientes</p>
                         <p>Sem suporte</p>
                         <button className="btn btn-lg btn-outline-primary">Começar Agora</button>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card"> <h1>Pro</h1></div>
                    <div className="card-body">
                        <h2>R$ 49,90<small className="text-muted">/mês</small></h2>
                         <p>Até 200 clientes</p>
                         <p>Suporte por email</p>
                         <button className="btn btn-lg btn-outline-primary">Assinar Agora</button>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card"> <h1>Free</h1></div>
                    <div className="card-body">
                        <h2>R$ 99,90<small className="text-muted">/mês</small></h2>
                         <p>Clientes Ilimitados</p>
                         <p>Suporte por telefone</p>
                         <button className="btn btn-lg btn-outline-primary">Assinar Agora</button>
                    </div>
                </div>
            </div>
          </div>
        </section>
    );
}

export default Precos;
