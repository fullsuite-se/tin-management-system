import {useEffect, useState} from "react";
import type { User } from "./lib/types.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import { auth } from "./lib/firebase.ts";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "firebase/auth";

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        auth.signOut().catch((err) => {
            console.error("Sign out failed:", err);
        }); // only for dev testing!
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const email = firebaseUser.email || "";
                if (email.endsWith("@getfullsuite.com") || email.endsWith("@viascari.com")) {
                    setUser({ name: firebaseUser.displayName ?? "", email: email, avatar: firebaseUser.photoURL ?? "" });
                } else {
                    auth.signOut().catch((err) => {
                        console.error("Sign out failed:", err);
                    });
                    alert("Only company emails are allowed to access the app. Please login with your company email.");
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (email: string) => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ login_hint: email, });

        try {
            await setPersistence(auth, browserSessionPersistence);

            const result = await signInWithPopup(auth, provider);
            console.log("Login success:", result.user);
        } catch (error) {
            console.error("Error during sign-in:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <>
            {user ?
                <Dashboard name={user.name} email={user.email} avatar={user.avatar} onLogout={() => setUser(null)}/>
                :
                <Login onLogin={handleLogin} />
            }
        </>
    );
}
