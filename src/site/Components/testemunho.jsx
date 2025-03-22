import React from 'react';

function Testemunho() {
    return (
        <section id="testemunho">
            <div className="container">                          
                <div id="carouselExampleInterval" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <h2>Excelente ferramenta para acompanhamento e organização, dos seus atendimentos. E saldos a receber</h2>
                            <img src="Images/cliente2.jpg" alt="Cliente 2" />
                            <em>Flávia Cristina - São Paulo</em>
                        </div>

                        <div className="carousel-item" data-bs-interval="2000">
                            <h2>Excelente ferramenta para acompanhamento e organização, dos seus atendimentos. E saldos a receber</h2>
                            <img src="Images/cliente3.jpg" alt="Cliente 3" />
                            <em>Roberto Freires - São Paulo</em>
                        </div>
                    </div>
                    
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>                    
            </div>
        </section>
    );
}

export default Testemunho;
