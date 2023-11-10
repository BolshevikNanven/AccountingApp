import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"

export default function DeleteDialog({ title, description, onDelete = () => { }, children }) {

    const [open, setOpen] = useState(false)

    const handleClickDelete = () => {
        setOpen(false)
        onDelete()
    }

    return (
        <Dialog open={open} onOpenChange={() => open && setOpen(false)}>
            <DialogTrigger onClick={() => setOpen(true)} asChild>{children}</DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()} className="flex flex-col gap-0">
                <p className=" text-lg font-semibold">{title} 吗？</p>
                <p className=" mt-1 text-sm text-zinc-600">{description}</p>
                <Button onClick={handleClickDelete} className=" mt-3 self-baseline border-red-500 text-red-600 hover:text-red-700 hover:bg-red-100" variant='outline'>确认删除</Button>
            </DialogContent>
        </Dialog>
    )
}