import * as React from "react"
import { cn } from '../../lib/utils.ts'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-[#0097B2] text-white hover:bg-[#007A94]": variant === "default",
                        "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
                        "border border-gray-300 bg-transparent hover:bg-gray-50": variant === "outline",
                        "bg-gray-100 text-gray-900 hover:bg-gray-200": variant === "secondary",
                        "hover:bg-gray-100": variant === "ghost",
                        "text-[#0097B2] underline-offset-4 hover:underline": variant === "link",
                    },
                    {
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = "Button"

export { Button }


// import type React from "react"
// import { cn } from "../../lib/utils"
//
// interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     variant?: "default" | "outline"
//     size?: "default" | "sm"
// }
//
// const variants = {
//     default: "bg-gradient-to-r from-[#0097B2] to-[#00B4D8] text-white hover:from-[#007A94] hover:to-[#0097B2]",
//     outline: "border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 hover:border-gray-300",
// }
//
// const sizes = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 px-3",
// }
//
// const Button: React.FC<Props> = ({ className, variant = "default", size = "default", children, ...props }) => (
//     <button
//         className={cn(
//             "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md transform hover:scale-[1.02]",
//             variants[variant],
//             sizes[size],
//             className,
//         )}
//         {...props}
//     >
//         {children}
//     </button>
// )
//
// export { Button }
// export default Button
