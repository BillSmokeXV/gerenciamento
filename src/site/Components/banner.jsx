import React from 'react';

function Banner(){
    return <section id="banner">
        <div className="container">
            <div className="row">
                 
                 <div className="col-lg-6">
                    <h1>Um Gerenciador de Atendimento fácil de configurar e usar.</h1>
                    <h4>Gerencie seus Atendimentos em um único lugar.</h4>
                    <a href="/app/novaconta" className="btn btn-dark btn-lg btn-banner">Criar uma conta</a>
                    <a href="/app/login" className="btn btn-outline-light btn-lg btn-banner">Fazer Login</a>
                 </div>

                 <div className="col-lg-6">
                    <img src="Images/usar-site.png" alt="Roberto Recuperações" />
                 </div>
                 
            </div>
        </div>
    </section>
  }

export default Banner;