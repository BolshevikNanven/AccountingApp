import dayjs from "dayjs";
import { cn, computeNumber } from "../../lib/utils";

import { CheckCircle2, Palette, Trash2 } from "lucide-react";

import { useMemo } from "react";

import ColorPicker from "../picker/colorpicker";
import DeleteDialog from "../dialog/dialog";

import Color from 'color'


export default function LedgerCard(
    { ledger, selectedLedger, activeLedger, ledgerBill, onClick, onSelectLedger, onChangeName = () => { }, onChangeColor = () => { }, onDelete = () => { } }
) {

    const getLedgerCount = () => {
        return ledgerBill.length;
    }

    const getLedgerSummary = useMemo(() => {
        let summary = [0, 0, 0]

        ledgerBill.forEach(bill => {
            if (bill.count > 0) {
                summary[0] = computeNumber(summary[0], '+', bill.count);
            } else summary[1] = computeNumber(summary[1], '+', Math.abs(bill.count))

            summary[2] = computeNumber(summary[2], '+', bill.count)
        })

        return summary;

    }, [ledgerBill])

    const handleSelectLedger = (e) => {
        e.stopPropagation()
        onSelectLedger(ledger.id);
    }
    const handleClickInput = (e) => {
        e.stopPropagation()
    }
    const handleBlurInput = (e) => {
        onChangeName(ledger.id, e.target.value)
    }
    const handleSelectColor = (color) => {
        onChangeColor(ledger.id, color)
    }
    const handleClickColor = (e) => {
        e.stopPropagation()
    }
    const handleDelete = (id) => {
        onDelete(id)
    }
    const getFontColor = (color) => {
        const luminosity = Color(color).luminosity()
        if (luminosity < 0.5) {
            return '#fafafa'
        }else return Color(color).darken(0.74).string()
    }

    return (
        <div
            key={ledger.id}
            onClick={() => onClick(ledger.id)}
            className={cn(" p-4 w-[226px] h-[268px] border-[4px] transition-all rounded-[16px] relative turnpage border-transparent group hover:border-zinc-400",
                activeLedger === ledger.id && "w-[452px]",
                selectedLedger === ledger.id && " border-primary hover:border-primary",
            )}
        >
            <div
                className={cn("bg-white w-[186px] h-[228px] rounded-e-[18px] shadow flex flex-col px-3 py-5 select-none absolute left-4 top-4 page",
                    activeLedger === ledger.id && " active")}
                style={{ backgroundColor: ledger.color, color: getFontColor(ledger.color) }}
            >
                <header className={cn(" hidden flex-row items-center justify-between", activeLedger === ledger.id && "flex flex-row-reverse")}>
                    <ColorPicker onSelect={handleSelectColor}>
                        <Palette onClick={handleClickColor} className="w-[18px] h-[18px] cursor-pointer" />
                    </ColorPicker>
                    <DeleteDialog onDelete={() => handleDelete(ledger.id)} title={`确认删除 ${ledger.name} 吗？`} description={"此操作不可撤销，将会销毁账本的所有数据"}>
                        <Trash2 onClick={(e) => e.stopPropagation()} className="w-[18px] h-[18px] cursor-pointer" />
                    </DeleteDialog>

                </header>
                <span className="flex-1"></span>
                <input
                    type="text"
                    className={cn(" outline-none px-[2px] border-0 bg-transparent hover:bg-zinc-100/50 font-semibold", activeLedger !== ledger.id && "text-right ")}
                    defaultValue={ledger.name}
                    onClick={handleClickInput}
                    onBlur={handleBlurInput}
                />
                <p className=" self-end text-xs">创建于{dayjs(ledger.create_time).format('YYYY年M月D日')}</p>
            </div>
            <div className={cn("bg-white w-[188px] h-[228px] rounded-e-[18px] shadow flex flex-col px-3 py-5 select-none absolute left-4 top-4 text-zinc-800",
                activeLedger === ledger.id && "left-1/2")}
            >
                <p className=" text-sm border-b border-t">{dayjs().diff(ledger.create_time, 'day')} 天以来，</p>
                <p className=" text-sm border-b">共计入账本 <span className=" font-semibold">{getLedgerCount()}</span>笔，</p>
                <p className=" pt-1 text-xs border-b">-支出 <span className=" font-semibold">{getLedgerSummary[1]}</span>元</p>
                <p className=" pt-1 text-xs border-b">-收入 <span className=" font-semibold">{getLedgerSummary[0]}</span>元</p>
                <p className=" pt-1 text-xs border-b">-盈余 <span className=" font-semibold">{getLedgerSummary[2]}</span>元</p>
                <p className=" pt-1 h-[21px] text-xs border-b"></p>
                <p className=" pt-1 h-[21px] text-xs border-b"></p>
                <p className=" pt-1 h-[21px] text-xs border-b"></p>
                <p className=" pt-1 text-xs border-b">最后一笔 {dayjs(ledger.update_time).format('YYYY年M月D日')}</p>
            </div>

            <span
                onClick={handleSelectLedger}
                className={cn("block absolute transition-all bottom-[-12px] right-[-12px] w-8 h-8 p-1 bg-zinc-50 dark:bg-zinc-850 rounded-full group-hover:opacity-100",
                    selectedLedger !== ledger.id && " opacity-0 ",
                )}
            >
                <CheckCircle2 strokeWidth={3} className={cn("text-zinc-400 cursor-pointer", selectedLedger === ledger.id ? " text-primary" : "hover:text-zinc-700",)} />
            </span>

        </div>
    )
}