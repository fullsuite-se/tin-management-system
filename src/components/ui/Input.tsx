import type React from "react"
import { cn } from "../../lib/utils.ts"

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, type, ...props }) => (
    <input
        type={type}
        className={cn(
            "flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-[#0097B2] focus:outline-none focus:ring-2 focus:ring-[#0097B2]/20 transition-all shadow-sm hover:border-gray-300",
            className,
        )}
        {...props}
    />
)

export { Input }
export default Input
