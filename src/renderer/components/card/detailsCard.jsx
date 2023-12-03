import dayjs from "dayjs"
import { cn } from "../../lib/utils"

import Icons from "../icons/icons"

export default function DetailsCard({ id, big_type, type, note, count, ledger, datetime, size = "normal", options = [], onClick = () => { }, className, full }) {

    const formatTime = () => {
        return dayjs(datetime).format('HH:mm');
    }
    const handleClick = () => {
        onClick(id);
    }

    return (
        <div onClick={handleClick} className={cn(" bg-zinc-100/50 rounded-[10px]  flex flex-row justify-center items-center",
            className, size === 'small' ? "p-1" : "px-2 py-3")}>
            <Icons name={type} size={(size === 'normal') ? 22 : 18} />
            <div className={cn(" flex-1 flex overflow-hidden", size === 'small' ? "flex-row items-center gap-1" : "ml-1 flex-col justify-center")}>
                <p className={cn(" text-zinc-900 dark:text-zinc-100 whitespace-nowrap", size === 'small' ? "text-sm" : "text-md")}>{type}</p>
                <p title={note} className=" text-zinc-500 dark:text-zinc-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap"><span className="mr-1">{formatTime(datetime)}</span>{note}</p>
            </div>
            {options?.includes('已报销') && <div className=" rounded-full px-2 py-1 bg-green-700 text-white text-xs mr-1">已报销</div>}
            <p className={cn(" font-semibold mr-1 min-w-[58px] text-right", count < 0 ? "text-green-600" : " text-red-600")}>{count > 0 ? '+' + count : count}</p>
        </div >
    )
}