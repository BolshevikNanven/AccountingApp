import { cn } from "../../lib/utils"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup
} from "../ui/dropdown-menu"

import { ChevronDown } from "lucide-react"


export default function DropdownSelector({ value, icon, radio = false, valuesOption, onChangeValue = () => { }, className }) {

    if (!radio)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn("flex flex-row items-center p-1 pr-1 px-2 text-sm text-zinc-800 rounded outline-none border-none hover:bg-zinc-200/60 transition-all", className)}>
                        {icon}{value}<ChevronDown className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {valuesOption.filter(values => values !== value).map(values =>
                        <DropdownMenuItem key={values} onClick={()=>onChangeValue(values)}>{values}</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    else return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("flex flex-row items-center p-1 pr-1 px-2 text-sm text-zinc-800 rounded outline-none border-none hover:bg-zinc-200/60 transition-all", className)}>
                    {icon}{value}<ChevronDown className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuRadioGroup value={value} onValueChange={onChangeValue}>
                    {valuesOption.map(values =>
                        <DropdownMenuRadioItem key={values} value={values}>{values}</DropdownMenuRadioItem>
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}