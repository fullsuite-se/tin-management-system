import React from 'react'
import { useState } from 'react'
import Profile from './Profile.tsx'
import { Button } from '../../ui/button.tsx'
import { LogOut, Menu, CircleQuestionMark } from "lucide-react"

interface Props {
    name: string,
    email: string,
    avatar: string,
    onLogout: () => void;
}

const Header: React.FC<Props> = ({ name, email, avatar, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="flex bg-white/80 backdrop-blur-sm md:rounded-lg md:shadow-lg md:border-white/50 px-3 pt-3 md:p-3 md:items-center justify-between">
                <div className="flex space-x-3">
                    <div className="flex items-center">
                        <div className="inline-block rounded-lg bg-gradient-to-r from-[#0097B2] to-[#00B4D8] p-1.5 md:shadow-lg w-fit h-fit">
                            <img
                                src="/logo-fs-tagline-DlvnjOS_.svg"
                                alt="FullSuite"
                                className="h-5 filter brightness-0 invert"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            TIN Management System
                        </h1>
                        <p className="text-xs text-gray-600">
                            Professional Database Management
                        </p>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-3">
                    <Profile name={name} email={email} avatar={avatar} />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 text-[#00B4D8]"
                    >
                        <CircleQuestionMark className="h-6 w-6 mr-1" />
                    </Button>
                    <Button
                        onClick={onLogout}
                        variant="outline"
                        size="sm"
                        className="border border-gray-300 hover:border-red-400 hover:text-red-600 bg-white/80 backdrop-blur-sm transition-all duration-200 h-8 px-3"
                    >
                        <LogOut className="h-3 w-3 mr-1" />
                        Log Out
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center mb-3">
                    <Button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        variant="ghost"
                        size="sm"
                    >
                        <Menu className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden flex items-center justify-between border-t border-t-gray-300 pt-2 mx-3">
                    <Profile name={name} email={email} avatar={avatar} />
                    <Button
                        onClick={onLogout}
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs bg-transparent"
                    >
                        <LogOut className="h-3 w-3 mr-1" />
                        Log Out
                    </Button>
                </div>
            )}
        </>






        // <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/50 p-3 sm:flex items-center justify-between">
        //     <div className="flex items-center space-x-3">
        //         <div className="bg-gradient-to-r from-[#0097B2] to-[#00B4D8] p-1.5 rounded-lg shadow-lg">
        //             <img
        //                 src="/logo-fs-tagline-DlvnjOS_.svg"
        //                 alt="FullSuite"
        //                 className="h-5 w-auto filter brightness-0 invert"
        //             />
        //         </div>
        //         <div>
        //             <h1 className="text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        //                 TIN Management System
        //             </h1>
        //             <p className="text-xs text-gray-600">
        //                 Professional Database Management
        //             </p>
        //         </div>
        //     </div>
        //     <div className="flex items-center space-x-3">
        //         <Profile name={ name } email={ email } avatar={ avatar } />
        //         <Button
        //             onClick={onLogout}
        //             variant="outline"
        //             size="sm"
        //             className="border border-gray-300 hover:border-red-400 hover:text-red-600 bg-white/80 backdrop-blur-sm transition-all duration-200 h-8 px-3"
        //         >
        //             <LogOut className="h-3 w-3 mr-1" />
        //             Log Out
        //         </Button>
        //     </div>
        // </div>
    );
}

export default Header;