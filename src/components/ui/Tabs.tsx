import React from "react";
import { cn } from "../../lib/utils";

interface Props {
    active: string
    onChange: (value: string) => void
    options: string[]
}

const Tabs: React.FC<Props> = ({ active, onChange, options }) => {
    return (
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(option)}
                    className={cn(
                        "px-4 py-1.5 text-sm font-medium rounded-sm transition-colors",
                        active === option
                            ? "bg-[#0097B2] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Tabs;