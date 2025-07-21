import {useState, useEffect} from "react";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import type {User} from "./types/user.ts";
import AlertProvider from "./context/alert-provider.tsx";
import Alert from "./components/Alert.tsx";
import Toast from "./components/Toast.tsx";
import ToastProvider from "./context/toast-provider.tsx";

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
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
        sessionStorage.setItem("user", JSON.stringify(googleUser))
    };

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
    }

    return(
        <AlertProvider>
            <ToastProvider>
                <>
                    {user ?
                        <Dashboard name={user.name} email={user.email} avatar={user.avatar} onLogout={handleLogout}/>
                        :
                        <Login onLogin={handleGoogleLogin} />
                    }
                </>
                <Alert />
                <Toast />
            </ToastProvider>
        </AlertProvider>
    );
}