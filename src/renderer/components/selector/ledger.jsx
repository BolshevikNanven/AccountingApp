import { useMemo } from "react"
import { useLedgerdata } from "../../store/provider/data-provider"
import { useGlobalState } from "../../store/provider/state-provider"
import { DropdownRadioSelector } from "./dropdown"
import { Book } from "lucide-react"

export default function LedgerSelector({ iconless, value, onChangeValue, className }) {

    const [ledgerData, dispatchLedgerData] = useLedgerdata()
    const [globalState, dispatchGlobalStateData] = useGlobalState()

    const getValueOption = useMemo(() => {
        return ledgerData.map(ledger => ({ value: ledger.id, label: ledger.name }))
    }, [ledgerData])

    const changeLedger = (value) => {
        dispatchGlobalStateData({ selectedLedger: value })
    }

    return (
        <DropdownRadioSelector
            className={className}
            onChangeValue={onChangeValue || changeLedger}
            icon={!iconless && <Book className="w-5 h-5 mr-1 text-zinc-600 dark:text-zinc-50" />}
            value={value || globalState.selectedLedger}
            valuesOption={getValueOption}
        />
    )
}