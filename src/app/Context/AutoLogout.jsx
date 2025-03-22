import { useEffect, useRef } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function AutoLogout({ tempoLimite = 10 * 60 * 1000 }) {
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const auth = getAuth();
            signOut(auth).then(() => {
                navigate('/login');
            });
        }, tempoLimite);
    };

    useEffect(() => {
        resetTimer();

        const eventos = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
        eventos.forEach(e => window.addEventListener(e, resetTimer));

        return () => {
            eventos.forEach(e => window.removeEventListener(e, resetTimer));
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return null;
}

export default AutoLogout;
