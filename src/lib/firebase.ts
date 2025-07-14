import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBhOcF4eBasawop-jJekyja1g3qxxX-5O8",
    authDomain: "tin-management-system.firebaseapp.com",
    projectId: "tin-management-system",
    storageBucket: "tin-management-system.firebasestorage.app",
    messagingSenderId: "710222248145",
    appId: "1:710222248145:web:6b3f762c8aaed81fc56df0",
    measurementId: "G-Q6RCEW4MV6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);