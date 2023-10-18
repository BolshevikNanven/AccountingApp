import MainHeader from "../../components/mainHeader/MainHeader"

import { ScrollArea } from "../../components/ui/scrollarea"

export default function Calendar() {
    return (
        <ScrollArea className="flex-1 flex flex-col max-h-full px-4 overflow-x-hidden">
            <MainHeader title="流水日历" />


            <div className="h-screen"></div>

        </ScrollArea>
    )
}