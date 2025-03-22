import React from 'react';

function Features(){
    return <section id="features">
        <div className="container">
            <div className="row">
                 
                 <div className="col-lg-4 feature-box">
                    <i className="icon fa-solid fa-heart fa-4x"></i>
                    <h3>Fácil de usar</h3>
                    <p>O sistema possui uma interface muito simples e fácil de utilizar.</p>
                 </div>

                 <div className="col-lg-4 feature-box">
                    <i className="icon fa-solid fa-globe fa-4x"></i>
                    <h3>Em qualquer lugar</h3>
                    <p>Gerencie seu fluxo de trabalho de forma eficiente, onde quer que você esteja.</p>
                 </div> 

                 <div className="col-lg-4 feature-box">
                    <i className="icon fa-solid fa-sitemap fa-4x"></i>
                    <h3>Organização é tudo</h3>
                    <p>Tenha sua carteira de valores a receber sempre muito bem organizada.</p>
                 </div> 
                                  
            </div>
        </div>
    </section>
  }

export default Features;