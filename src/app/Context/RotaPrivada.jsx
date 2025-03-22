import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function RotaPrivada({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Usuário autenticado', user);
            setUsuario(user);
            setVerificando(false);
        });

        return () => unsubscribe();
    }, []);

    if (verificando) {
        return <div className="text-center mt-5">Verificando autenticação...</div>;
    }

    if (!usuario) {
        console.log('Usuário não autenticado, redirecionando para login');
        return <Navigate to="/login" />;
    }

    return (
        <>
            {children}
        </>
    );
}

export default RotaPrivada;
