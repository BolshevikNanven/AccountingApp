import { ScrollArea } from "../ui/scrollarea"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

import NavigationItem from "./navigationItem"

import {
    HomeRegular, HomeFilled, CalendarRegular, CalendarFilled, ClipboardBulletListLtrRegular, ClipboardBulletListLtrFilled,
    StackRegular,StackFilled
} from "@fluentui/react-icons"

import { WeatherSunnyRegular, WeatherMoonRegular } from "@fluentui/react-icons"


export default function NavigationSideBar() {
    return (
        <div className=" pt-8 w-[68px] bg-gray-100 flex flex-col dark:bg-zinc-900">
            <ScrollArea className="flex-1">
                <div className="flex flex-1 flex-col w-full p-2 gap-2">
                    <NavigationItem icon={<HomeRegular />} activeIcon={<HomeFilled />} label={"主页"} routeTo={'/'} exact />
                    <NavigationItem icon={<ClipboardBulletListLtrRegular />} activeIcon={<ClipboardBulletListLtrFilled />} label={"流水明细"} routeTo={'/details'}  />
                    <NavigationItem icon={<CalendarRegular />} activeIcon={<CalendarFilled />} label={"流水日历"} routeTo={'/calendar'} />
                    <NavigationItem icon={<StackRegular />} activeIcon={<StackFilled />} label={"资产"} routeTo={'/account'} />
                </div>
            </ScrollArea>
            <div className="flex flex-col w-full p-2 gap-2">
                <Separator className=" bg-gray-300 w-[36px] mx-auto" />
                <ModeToggle />
            </div>
        </div>
    )
}

export function ModeToggle() {

    return (
        <Button variant="ghost" size="icon" className="mx-auto flex justify-center items-center text-3xl font-bold w-[46px] h-[46px] rounded-[8px] transition-all hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-850">
            <WeatherSunnyRegular className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <WeatherMoonRegular className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    )
}