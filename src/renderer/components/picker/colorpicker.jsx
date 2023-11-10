import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

const color = [
    '#e2e8f0', '#fecaca', '#fed7aa', '#fde68a', '#d9f99d', '#a5f3fc', '#c7d2fe', '#f5d0fe', '#71717a', '#f97316',
    '#22c55e', '#14b8a6', '#0ea5e9', '#8b5cf6', '#f43f5e'
]

export default function ColorPicker({ children, onSelect = () => { } }) {

    const [open, setOpen] = useState(false)

    const handleSelect = (color) => {
        onSelect(color)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={() => open && setOpen(false)}>
            <PopoverTrigger onClick={() => setOpen(true)} asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" onClick={(e)=>e.stopPropagation()}>
                <ColorContent colorOptions={color} onSelect={handleSelect} />
            </PopoverContent>
        </Popover>
    )
}

function ColorContent({ colorOptions, onSelect }) {
    const handleSelect = (e) => {
        e.stopPropagation();
        onSelect(e.target.dataset.color)
    }

    return (
        <div className="flex flex-row flex-wrap w-[240px] p-2">
            {colorOptions.map(color => (
                <div key={color} data-color={color} onClick={handleSelect} className=" w-1/6 h-[40px] border-[3px] border-transparent hover:border-white hover:shadow" style={{ backgroundColor: color }}></div>
            ))}
        </div>
    )
}