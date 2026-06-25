import { cn } from "@/lib/utils"

export const MyInput = ({ className,label, type, ...props }: React.ComponentProps<"input">& {
    label ?:string
}) => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <input
                        id={props.id}
                        type={type}
                        placeholder=""
                        className={cn("border-b border-gray-300 py-1 focus:border-b-2  transition-colors focus:outline-none peer bg-inherit disabled:border-gray-500 disabled:text-white/50",
                            className
                        )}
                        {...props}
                    />
                    <label
                        htmlFor={props.id}
                        className={` ${className?.includes("hidden")?"hidden":""}   absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all  peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm`}
                    >
                        {label}
                    </label>
                </div>
            </div>
        </div>

    )
}
