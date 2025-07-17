import {useState, useEffect} from "react";
import type { User } from "./lib/types.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (input: google.accounts.id.IdConfiguration) => void;
                    prompt: (callback?: (notification: google.accounts.id.PromptMomentNotification) => void) => void;
                };
            };
        };
    }
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleGoogleLogin = async (googleUser: {
        name: string;
        email: string;
        avatar: string;
    }) => {
        setUser(googleUser);
        localStorage.setItem("user", JSON.stringify(googleUser))
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return(
        <>
            {user ?
                <Dashboard name={user.name} email={user.email} avatar={user.avatar} onLogout={handleLogout}/>
                :
                <Login onLogin={handleGoogleLogin} />
            }
        </>
    );
}