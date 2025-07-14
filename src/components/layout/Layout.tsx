import React from "react";

interface LayoutProps {
    children: React.ReactNode[];
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="md:p-4 h-screen flex flex-col max-w-7xl mx-auto">
            {children}
        </div>
    );
}