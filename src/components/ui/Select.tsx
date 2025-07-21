"use client"
import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "../../lib/utils.ts"
// === Utility: Safe displayName matcher ===
function isReactElementWithDisplayName<P = unknown>(
    element: React.ReactNode,
    displayName: string
): element is React.ReactElement<P> {
    return (
        React.isValidElement(element) &&
        typeof element.type !== "string" &&
        (element.type as { displayName?: string }).displayName === displayName
    )
}
interface SelectProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}
const Select: React.FC<SelectProps> = ({ children, className }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const toggleOpen = () => setIsOpen((prev) => !prev)
    const close = () => setIsOpen(false)
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                close()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    return (
        <div ref={containerRef} className={cn("relative inline-block w-full text-sm", className)}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child
                if (isReactElementWithDisplayName(child, "SelectTrigger")) {
                    return React.cloneElement(child, {
                        onClick: toggleOpen,
                    } as React.HTMLAttributes<HTMLDivElement>)
                }
                if (isReactElementWithDisplayName(child, "SelectContent") && !isOpen) {
                    return null
                }
                if (isReactElementWithDisplayName(child, "SelectContent")) {
                    return React.cloneElement(child, {
                        onClose: close,
                    } as SelectContentProps)
                }
                return child
            })}
        </div>
    )
}


const SelectValue: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <span className="truncate">{children}</span>
}
const SelectTrigger = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean }
>(({ className, children, disabled, ...props }, ref) => (
    <div
        ref={ref}
        tabIndex={disabled ? -1 : 0}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-[#0097B2] focus:outline-none focus:ring-1 focus:ring-[#0097B2] disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer",
            disabled && "cursor-not-allowed bg-gray-100 opacity-50",
            className
        )}
        {...props}
    >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
))
SelectTrigger.displayName = "SelectTrigger"
const SelectScrollUpButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
            <ChevronUp className="h-4 w-4" />
        </div>
    )
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"
const SelectScrollDownButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
            <ChevronDown className="h-4 w-4" />
        </div>
    )
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"
interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose?: () => void
}
const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "absolute z-50 max-h-96 min-w-[8rem] overflow-auto rounded-md border bg-white text-gray-950 shadow-md mt-2",
            className
        )}
        {...props}
    >
        <SelectScrollUpButton />
        <div className="p-1">{children}</div>
        <SelectScrollDownButton />
    </div>
))
SelectContent.displayName = "SelectContent"
const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
    )
)
SelectLabel.displayName = "SelectLabel"
interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    isSelected?: boolean
    children: React.ReactNode
    disabled?: boolean
    onSelect?: () => void
    onClose?: () => void
}
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ className, children, isSelected, disabled, onSelect, onClose, ...props }, ref) => (
        <div
            ref={ref}
            role="option"
            aria-selected={isSelected}
            tabIndex={disabled ? -1 : 0}
            className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 disabled:pointer-events-none disabled:opacity-50",
                isSelected && "font-semibold bg-gray-100",
                disabled && "cursor-not-allowed",
                className
            )}
            onClick={() => {
                if (!disabled) {
                    onSelect?.()
                    onClose?.()
                }
            }}
            onKeyDown={(e) => {
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    onSelect?.()
                    onClose?.()
                }
            }}
            {...props}
        >
            {isSelected && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-[#0097B2]">
                    <Check className="h-4 w-4" />
                </span>
            )}
            <span className={isSelected ? "ml-5" : ""}>{children}</span>
        </div>
    )
)
SelectItem.displayName = "SelectItem"
const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-100", className)} {...props} />
    )
)
SelectSeparator.displayName = "SelectSeparator"
export {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
