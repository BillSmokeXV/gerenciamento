import React from 'react';

function Footer(){
    var ano = new Date().getFullYear();

    return <section id="footer">
        <div>
            <ul className="list-unstyled list-inline social text-center">
                <li className="list-inline-item"><a href="https://www.facebook.com/roberto.freiressilva/" target="_blank"><i className="fa fa-facebook fa-2x"></i></a></li>
                <li className="list-inline-item"><a href="https://www.instagram.com/smokedriverofc/" target="_blank"><i className="fa fa-instagram fa-2x"></i></a></li>
                <li className="list-inline-item"><a href="/#" target="_blank"><i className="fa fa-envelope fa-2x"></i></a></li>
            </ul>
        </div>
    <a href="mailto:rfsinfomanutencao@gmail.com">rfsinfomanutencao@gmail.com</a>
    <p>Desenvolvido por Roberto Freires Silva - {ano}</p>
    </section>;
}

export default Footer;