import { useRef, useEffect} from "react"
import { useState } from "react"
import { Shield, Database, Users, FileText, Chrome } from "lucide-react"

interface GoogleJwtPayload {
    name: string;
    email: string;
    picture: string;
}

interface LoginProps {
    onLogin: (user: { name: string; email: string; avatar: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [error, setError] = useState("")

    function parseJwt(token: string): GoogleJwtPayload {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    const googleBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google && googleBtnRef.current) {
            window.google.accounts.id.initialize({
                client_id: "710222248145-0au9ppcgk7p8r6n8jd6gr758plm46sdc.apps.googleusercontent.com",
                callback: (response: google.accounts.id.CredentialResponse) => {
                    if (!response.credential) return;

                    const user = parseJwt(response.credential);

                    if (
                        !user.email.endsWith("@getfullsuite.com") &&
                        !user.email.endsWith("@viascari.com")
                    ) {
                        setError("Unauthorized domain. Access denied.");
                        return;
                    }

                    onLogin({
                        name: user.name,
                        email: user.email,
                        avatar: user.picture,
                    });
                },
                auto_select: true,
            });

            window.google.accounts.id.renderButton(googleBtnRef.current!, {
                type: "standard",
                theme: "filled_black",
                size: "large",
                width: 300,
                shape: "pill",
            });

            window.google.accounts.id.prompt();
        }
    }, []);

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
                <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/20 bg-white/95 backdrop-blur-sm p-10 shadow-2xl transform">
                    {/* Logo + title */}
                    <div className="mb-10 text-center">
                        <div className="mb-6 p-6 flex justify-center">
                            <img src="/logo-fs-tagline-DlvnjOS_.svg" alt="FullSuite" width={220} height={70} className="h-14 w-auto" />
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

                    <div className="space-y-8">
                        {/* Google Sign In Button */}
                        <div 
                            ref={googleBtnRef}
                            className={"flex justify-center w-full max-w-xs mx-auto"}
                        />

                        {/* Domain info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
                            <Chrome className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">
                                    Google Authentication
                                </p>
                                <p className="text-xs text-blue-700 mt-1">
                                    You'll be redirected to Google to complete sign-in securely
                                </p>
                            </div>
                        </div>

                        {/* Allowed domains */}
                        <div className="bg-gray-50 rounded-xl px-4">
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
                    </div>

                    {/* Security notice */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">Protected by enterprise-grade security and Google OAuth 2.0</p>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style>
                {`
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
                `}
            </style>
        </>
    )
}