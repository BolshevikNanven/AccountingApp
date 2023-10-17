import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"

export default function NavigationItem({ icon, activeIcon, label, routeTo, exact = false}) {

    const resolved = useResolvedPath(routeTo);
    const pathMatch = useMatch({ path: resolved.pathname, end: exact });

    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Link className="flex justify-center" to={routeTo}>
                        <button className={cn("flex justify-center items-center text-[1.6rem] font-bold w-[46px] h-[46px] rounded-[8px] transition-all hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-850",
                            pathMatch && "bg-gray-200 text-primary dark:bg-zinc-700")} >
                            {pathMatch ? activeIcon : icon}
                        </button>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p className=" text-xs">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}