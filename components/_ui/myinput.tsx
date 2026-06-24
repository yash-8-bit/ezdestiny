import { cn } from "@/lib/utils"
import { useId } from "react"

export const MyInput = ({ className,label, type, ...props }: React.ComponentProps<"input">& {
    label ?:string
}) => {
    const id = useId()
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <input
                        id={id}
                        type={type}
                        placeholder=""
                        className={cn("border-b border-gray-300 py-1 focus:border-b-2  transition-colors focus:outline-none peer bg-inherit",
                            className
                        )}
                        {...props}
                    />
                    <label
                        htmlFor={id}
                        className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all  peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                    >
                        {label}
                    </label>
                </div>
            </div>
        </div>

    )
}
