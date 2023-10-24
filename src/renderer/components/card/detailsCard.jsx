import dayjs from "dayjs"
import { cn } from "../../lib/utils"

import Icons from "../icons/icons"

export default function DetailsCard({ id, bigType, type, note, count, ledger, datetime, options = [], onClick=(id)=>{}, className, full }) {

    const formatTime = () => {
        return dayjs(datetime).format('HH:mm');
    }
    const handleClick = () => {
        onClick(id);
    }

    return (
        <div onClick={handleClick} className={cn(" bg-zinc-50 rounded-[10px] px-2 py-3 flex flex-row justify-center items-center", className)}>
            <Icons name={type} />
            <div className=" ml-1 flex-1 flex flex-col justify-center">
                <p className=" text-zinc-900 text-md">{type}</p>
                <p className=" text-zinc-500 text-xs"><span className="mr-1">{formatTime(datetime)}</span>{note}</p>
            </div>
            {options.includes('已报销') && <div className=" rounded-full px-2 py-1 bg-green-700 text-white text-xs mr-1">已报销</div>}
            <p className={cn("  font-semibold mr-1 min-w-[58px] text-right", count < 0 ? "text-red-600" : " text-green-600")}>{count > 0 && '+'}{count}</p>
        </div>
    )
}