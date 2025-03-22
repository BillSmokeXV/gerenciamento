import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOR5XpL1Jl8axxYzfg4nLtB-qFk_loBRU",
    authDomain: "gerenciador-recebiveis.firebaseapp.com",
    projectId: "gerenciador-recebiveis",
    storageBucket: "gerenciador-recebiveis.firebasestorage.app",
    messagingSenderId: "445178180047",
    appId: "1:445178180047:web:d5f29dca4fe91c78d3e2ba"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
