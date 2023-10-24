import { cn } from "../../lib/utils"

export default function InOutCard({ title, count, icon, className }) {
    return (
        <div className={cn('flex-1 flex flex-row justify-between rounded-[10px] px-3 py-4 relative', className)}>
            <p className="flex flex-row text-zinc-50 items-center text pl-[2px] gap-1">
                {icon}{title}
            </p>
            <p className=" z-10 text-white text-2xl font-semibold mr-2">{count}</p>
            
        </div>
    )
}