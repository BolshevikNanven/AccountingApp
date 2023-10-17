import MainHeader from "../../components/mainHeader/MainHeader"

import { ScrollArea } from "../../components/ui/scrollarea"

export default function Details() {
    return (
        <ScrollArea className="flex flex-col max-h-full px-4 overflow-x-hidden">
            <MainHeader title="流水明细" />


            <div className="h-screen"></div>

        </ScrollArea>
    )
}