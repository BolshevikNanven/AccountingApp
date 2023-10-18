import { cn } from "../../lib/utils"

import Icons from "../icons/icons"

export default function DetailsCard({ type, note, count, className }) {
    return (
        <div className={cn(" bg-zinc-50 rounded-[10px] px-2 py-3 flex flex-row justify-center items-center", className)}>
            <Icons name={type} />
            <div className=" ml-1 flex-1 flex flex-col justify-center">
                <p className=" text-zinc-900 text-md">{type}</p>
                {note && <p className=" text-zinc-500 text-xs">{note}</p>}
            </div>

            <p className={cn("  font-semibold mr-1", count < 0 ? "text-red-600" : " text-green-600")}>{count > 0 && '+'}{count}</p>
        </div>
    )
}