import { useState } from "react"
import type { User } from "./utils/types.tsx"
import Dashboard from './components/dashboard/Dashboard.tsx'
import { validateEmailDomain } from "./lib/utils"
import LoginForm from "./components/LoginForm"
// import { Toaster } from "./components/ui/toaster"

// Mock users for demo - in production, this would be handled by your authentication system
const MOCK_USERS = [
    { email: "admin@getfullsuite.com", displayName: "FullSuite Administrator" },
    { email: "manager@getfullsuite.com", displayName: "FullSuite Manager" },
    { email: "user@getfullsuite.com", displayName: "FullSuite User" },
    { email: "admin@viascari.com", displayName: "Viascari Administrator" },
    { email: "manager@viascari.com", displayName: "Viascari Manager" },
]

export default function App() {
    const [user, setUser] = useState<User | null>(null)

    const handleLogin = async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Validate email domain
        if (!validateEmailDomain(email)) {
            throw new Error("Access restricted to @getfullsuite.com and @viascari.com domains only")
        }

        // In production, this would validate against your actual authentication system
        // For demo purposes, we'll check if the email exists in our mock users
        const mockUser = MOCK_USERS.find((u) => u.email === email)

        if (mockUser && password.length > 0) {
            setUser({
                email: mockUser.email,
                displayName: mockUser.displayName,
            })
        } else {
            throw new Error("Invalid credentials or user not found")
        }
    }

    return (
        <>
            {!user ? <LoginForm onLogin={handleLogin} /> : <Dashboard name={user.displayName} email={user.email} avatar={''} onLogout={() => setUser(null)} />}
        </>
    );
}
