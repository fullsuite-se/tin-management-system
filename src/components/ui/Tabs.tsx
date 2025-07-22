"use client"

import type React from "react"
import { cn } from "../../lib/utils.ts"

interface Props {
    active: string
    onChange: (value: string) => void
    options: string[]
    className?: string
}

const Tabs: React.FC<Props> = ({ active, onChange, options, className }) => (
    <div
        className={cn(
            "inline-flex rounded-xl overflow-hidden border border-gray-200 w-full shadow-sm bg-gradient-to-r from-gray-50 to-white",
            className,
        )}
    >
        {options.map((option) => (
            <button
                key={option}
                onClick={() => onChange(option)}
                className={cn(
                    "flex-1 px-4 py-2.5 text-sm font-semibold text-center transition-all duration-300 border-r border-gray-200 last:border-r-0 relative overflow-hidden",
                    active === option ? "bg-[#0097B2] text-white shadow-lg z-10" : "bg-white text-gray-600 hover:bg-gray-50",
                )}
            >
                <span className="relative z-10">{option}</span>
                {active === option && <div className="absolute inset-0 bg-gradient-to-r from-[#0097B2] to-[#00B4D8]" />}
            </button>
        ))}
    </div>
)

export default Tabs
