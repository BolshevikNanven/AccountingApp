import { cn } from "../../lib/utils"

export default function InOutCard({ title, count, icon, className }) {
    return (
        <div className={cn('flex-1 flex flex-col rounded-[12px] px-3 py-4 relative', className)}>
            <p className="flex flex-row text-zinc-50 items-center font-sans text-sm pl-[2px] gap-1">
                {icon}{title}
            </p>
            <p className=" z-10 font-mono text-white text-3xl font-semibold">{count}</p>
            
        </div>
    )
}