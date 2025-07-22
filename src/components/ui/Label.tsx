import type React from "react"
import { cn } from "../../lib/utils.ts"

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...props }) => (
    <label className={cn("text-sm font-semibold text-gray-800 mb-2 block", className)} {...props}>
        {children}
    </label>
)

export { Label }
export default Label
