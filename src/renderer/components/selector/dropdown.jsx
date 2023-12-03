import { cn } from "../../lib/utils"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuCheckboxItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "../ui/dropdown-menu"

import { ChevronDown } from "lucide-react"


export default function DropdownSelector({ value, icon, valuesOption, label, onChangeValue = () => { }, className }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("flex flex-row items-center p-1 pr-1 px-2 text-sm text-zinc-800 dark:text-zinc-100 rounded outline-none border-0 dark:hover:bg-zinc-700 hover:bg-zinc-200/60 transition-all", className)}>
                    {icon}{(label && label(value)) || value}<ChevronDown className="w-3 h-3 ml-1" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {valuesOption.map((values, index) => (
                    <DropdownMenuItem key={index} onClick={() => onChangeValue(values)}>{(label && label(values)) || values}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function DropdownRadioSelector({ value, icon, valuesOption, onChangeValue = () => { }, className }) {

    const getLabel = (value) => {
        for (let v of valuesOption) {
            if (value === v.value) {
                return v.label
            }
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("flex flex-row items-center p-1 pr-1 px-2 text-sm text-zinc-800 dark:text-zinc-100 rounded outline-none border-0 dark:hover:bg-zinc-700 hover:bg-zinc-200/60 transition-all", className)}>
                    {icon}{getLabel(value)}<ChevronDown className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuRadioGroup value={value} onValueChange={onChangeValue}>
                    {valuesOption.map(option =>
                        <DropdownMenuRadioItem key={option.value} value={option.value}>{option.label}</DropdownMenuRadioItem>
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export function DropdownCheckSelector({ value, check, icon, valuesOption, onCheckedChange = () => { }, className }) {

    const checkValue = (value) => {
        if (check.find(v => v === value)) {
            return true
        }
        return false
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("flex flex-row items-center p-1 pr-1 px-2 text-sm text-zinc-800 dark:text-zinc-100 rounded outline-none border-none hover:bg-zinc-200/60 dark:hover:bg-zinc-700 transition-all", className)}>
                    {icon}{value}<ChevronDown className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {valuesOption.map(values =>
                    <DropdownMenuCheckboxItem key={values} checked={checkValue(values)} onCheckedChange={(c) => onCheckedChange(values, c)}>{values}</DropdownMenuCheckboxItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}