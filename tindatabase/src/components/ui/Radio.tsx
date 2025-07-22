"use client"

import type React from "react"
import { cn } from "../../lib/utils"

interface RadioOption {
    value: string
    label: string
}

interface Props {
    value?: string
    onChange: (value: string) => void
    options: RadioOption[]
    name: string
    className?: string
}

const Radio: React.FC<Props> = ({ value, onChange, options, name, className }) => (
    <div className={cn("flex gap-6", className)}>
        {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="sr-only"
                    />
                    <div
                        className={cn(
                            "w-4 h-4 rounded-full border-2 transition-all shadow-sm",
                            value === option.value
                                ? "border-[#0097B2] bg-[#0097B2]"
                                : "border-gray-300 bg-white group-hover:border-gray-400",
                        )}
                    >
                        {value === option.value && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                    </div>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{option.label}</span>
            </label>
        ))}
    </div>
)

export default Radio
