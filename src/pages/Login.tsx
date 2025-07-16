import type React from "react"

import { useState } from "react"
import { HelpCircle, Shield, Database, Users, FileText, Mail, ArrowRight, Chrome } from "lucide-react"
import { Button } from "../components/ui/Button.tsx"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"

interface LoginProps {
    onLogin: (email: string) => Promise<void>
}

export default function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [showManual, setShowManual] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            await onLogin(email)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* ——— Hero / form wrapper ——— */}
            <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0097B2] via-[#00B4D8] to-[#0077B6] p-4 overflow-hidden">
                {/* Enhanced decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 h-32 w-32 rounded-full border-2 border-white animate-pulse" />
                    <div className="absolute top-40 right-32 h-24 w-24 rounded-full border border-white animate-pulse delay-1000" />
                    <div className="absolute bottom-32 left-40 h-16 w-16 rounded-full border-2 border-white animate-pulse delay-500" />
                    <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full border border-white animate-pulse delay-700" />
                    <div className="absolute top-1/2 left-1/4 h-20 w-20 rounded-full border border-white animate-pulse delay-300" />
                    <div className="absolute top-1/3 right-1/4 h-28 w-28 rounded-full border border-white animate-pulse delay-900" />
                </div>

                {/* Floating icons with animation */}
                <Database className="absolute top-10 left-10 h-12 w-12 text-white/20 animate-float" />
                <Users className="absolute top-20 right-16 h-10 w-10 text-white/20 animate-float delay-500" />
                <FileText className="absolute bottom-16 left-16 h-8 w-8 text-white/20 animate-float delay-1000" />
                <Shield className="absolute bottom-40 right-40 h-10 w-10 text-white/20 animate-float delay-700" />

                {/* Card */}
                <div className="relative z-10 w-full max-w-lg">
                    {/* Help / user-manual button */}
                    <div className="absolute -top-16 right-0">
                        <Button
                            variant="outline"
                            onClick={() => setShowManual(true)}
                            className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                            <HelpCircle className="mr-2 h-4 w-4" />
                            User Manual
                        </Button>
                    </div>

                    <div className="rounded-3xl border border-white/20 bg-white/95 backdrop-blur-sm p-10 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
                        {/* Logo + title */}
                        <div className="mb-10 text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="p-6">
                                    <img src="/logo-fs-tagline-DlvnjOS_.svg" alt="FullSuite" width={220} height={70} className="h-14 w-auto" />
                                </div>
                            </div>
                            <h1 className="mb-3 text-3xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B4D8] bg-clip-text text-transparent">
                                TIN Management System
                            </h1>
                            <p className="mb-2 text-gray-600 font-medium">Secure Google Authentication</p>
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                <Shield className="h-4 w-4 text-[#0097B2]" />
                                <span>Restricted to authorized domains</span>
                            </div>
                        </div>

                        {/* Enhanced Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-[#0097B2]" />
                                    Work Email Address
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.name@getfullsuite.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-14 pl-4 pr-12 text-lg border-2 border-gray-200 focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/10 rounded-xl transition-all duration-300"
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#0097B2] to-[#00B4D8] flex items-center justify-center">
                                            <Mail className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Domain info */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-start space-x-3">
                                    <Chrome className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">Google Authentication</p>
                                        <p className="text-xs text-blue-700 mt-1">
                                            You'll be redirected to Google to complete sign-in securely
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Allowed domains */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-medium text-gray-700 mb-2">Authorized Domains:</p>
                                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#0097B2] text-white text-xs rounded-full font-medium">
                    @getfullsuite.com
                  </span>
                                    <span className="px-3 py-1 bg-[#0097B2] text-white text-xs rounded-full font-medium">
                    @viascari.com
                  </span>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-4 animate-shake">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                                        <p className="text-sm font-medium text-red-700">{error}</p>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading || !email}
                                className="h-14 w-full transform rounded-xl bg-gradient-to-r from-[#0097B2] to-[#00B4D8] font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center space-x-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Connecting to Google...</span>
                  </span>
                                ) : (
                                    <span className="flex items-center justify-center space-x-3">
                    <Chrome className="h-5 w-5" />
                    <span>Continue with Google</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                                )}
                            </Button>
                        </form>

                        {/* Security notice */}
                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-500">Protected by enterprise-grade security and Google OAuth 2.0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ——— Enhanced User manual dialog ——— */}
            <Dialog open={showManual} onOpenChange={setShowManual}>
                <DialogContent className="max-h-[85vh] max-w-5xl overflow-y-auto sm:max-w-5xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-3xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B4D8] bg-clip-text text-transparent">
                            <HelpCircle className="mr-3 h-8 w-8 text-[#0097B2]" />
                            TIN Database Management System – User Manual
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 mb-3">Getting Started</h3>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li>• Enter your company email address from an authorized domain</li>
                                <li>• Click "Continue with Google" to authenticate securely</li>
                                <li>• Complete the Google sign-in process</li>
                                <li>• Access the TIN database management system</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h3 className="font-semibold text-green-900 mb-3">System Features</h3>
                            <ul className="text-sm text-green-800 space-y-2">
                                <li>• Add new TIN entries for individuals and companies</li>
                                <li>• Edit existing client information</li>
                                <li>• View detailed client profiles</li>
                                <li>• Delete entries with confirmation</li>
                                <li>• Filter and search through the database</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={() => setShowManual(false)}
                            className="bg-gradient-to-r from-[#0097B2] to-[#00B4D8] hover:from-[#007A94] hover:to-[#0097B2] text-white px-8"
                        >
                            Got it!
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Custom animations */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
        </>
    )
}