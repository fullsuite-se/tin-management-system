"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Shield, Database, Users, FileText } from "lucide-react"

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            await onLogin(email, password)
        } catch (error) {
            console.log(error)
            setError("Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-[#0097B2] via-[#00B4D8] to-[#0077B6] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
                {/* Background Pattern - Responsive */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 border border-white rounded-full"></div>
                    <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-12 sm:w-24 h-12 sm:h-24 border border-white rounded-full"></div>
                    <div className="absolute bottom-16 sm:bottom-32 left-20 sm:left-40 w-8 sm:w-16 h-8 sm:h-16 border border-white rounded-full"></div>
                    <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-20 sm:w-40 h-20 sm:h-40 border border-white rounded-full"></div>
                </div>

                {/* Floating Elements - Responsive */}
                <div className="absolute top-5 sm:top-10 left-5 sm:left-10 text-white/20">
                    <Database className="h-6 sm:h-12 w-6 sm:w-12" />
                </div>
                <div className="absolute top-10 sm:top-20 right-8 sm:right-16 text-white/20">
                    <Users className="h-5 sm:h-10 w-5 sm:w-10" />
                </div>
                <div className="absolute bottom-8 sm:bottom-16 left-8 sm:left-16 text-white/20">
                    <FileText className="h-4 sm:h-8 w-4 sm:w-8" />
                </div>

                <div className="w-full max-w-sm sm:max-w-md relative z-10">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                        {/* Logo and Title - Responsive */}
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="mb-3 flex justify-center">
                                <div className="bg-white rounded-xl p-3 sm:p-4">
                                    <img src="src/assets/logo-fs-tagline-DlvnjOS_.svg" alt="FullSuite" className="h-8 sm:h-12 w-auto" />
                                </div>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-[#0097B2] mb-2">TIN Management System</h1>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">Secure access for authorized personnel</p>
                            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                                <Shield className="h-3 w-3" />
                                <span className="text-center">Restricted to @getfullsuite.com and @viascari.com</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                                    Work Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.name@getfullsuite.com"
                                    required
                                    className="w-full h-10 sm:h-12 border-2 border-gray-200 focus:border-[#0097B2] rounded-lg text-sm sm:text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your work email password"
                                    required
                                    className="w-full h-10 sm:h-12 border-2 border-gray-200 focus:border-[#0097B2] rounded-lg text-sm sm:text-base"
                                />
                            </div>

                            <div className="text-right">
                                <a href="#" className="text-xs sm:text-sm text-[#0097B2] hover:text-[#007A94] font-medium">
                                    Forgot Password?
                                </a>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs sm:text-sm">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-10 sm:h-12 bg-[#0097B2] hover:bg-[#007A94] text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Log In"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
