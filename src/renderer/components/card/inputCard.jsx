import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

import dayjs from "dayjs";
import { nanoid } from "nanoid";

import { CalendarDays, CheckCircle2, ChevronsUpDown, Minus, Plus, XCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Timepicker from "../picker/timepicker";

import Icons from "../icons/icons";
import { ScrollArea } from "../ui/scrollarea";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/toast/use-toast";
import TypePicker from "../picker/typepicker";
import Datepicker from "../picker/datepicker";

import { useGlobalState } from "../../store/provider/state-provider";
import LedgerSelector from "../selector/ledger";

const emptyData = (ledgerId) => ({
    id: nanoid(),
    datetime: dayjs().format('YYYY-MM-DD HH:mm'),
    big_type: '餐饮',
    type: '餐饮',
    count: '',
    note: '',
    options: [],
    ledger_id: ledgerId,
})

const InputCard = ({ data = null, className, full, edit, transition, autofocus, onSubmit = () => { } }) => {

    const [globalState, dispatchGlobalStateData] = useGlobalState()

    const [open, setOpen] = useState(false);
    const [billdata, setBilldata] = useState(emptyData(globalState.selectedLedger))
    const [income, setIncome] = useState(false);

    const { toast } = useToast();

    const inputRef = useRef();
    const boxRef = useRef();


    /** not finished*/
    useEffect(() => {
        const listenKey = (e) => {
            if ((e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 189) && inputRef.current.value === '') {
                inputRef.current.focus();
            }
        }

        window.addEventListener('keydown', listenKey);

        return () => window.removeEventListener('keydown', listenKey);
    }, [])

    useEffect(() => {
        if (data === null) {
            setBilldata(emptyData(globalState.selectedLedger))
        } else {
            setBilldata({ ...data, count: Math.abs(data.count) })
            if (data.count > 0) setIncome(true)
        }

        //渐入动画
        playAnimation();

    }, [data])

    useEffect(() => {
        if (globalState.selectedLedger) {
            setBilldata({ ...billdata, ledger_id: globalState.selectedLedger })
        }

    }, [globalState.selectedLedger])

    const handleInputDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === '-' || e.key === '+' || e.key === 'e') {
            e.preventDefault()
        }
    }
    const handleInputCount = (e) => {
        if (!open && e.target.value !== "") setOpen(true);
        if (e.target.value === "" && open) setOpen(false);
        setBilldata({ ...billdata, count: e.target.value });
    }
    const handleInputNote = (e) => {
        setBilldata({ ...billdata, note: e.target.value });
    }
    const handleSelectDate = (date) => {
        setBilldata({ ...billdata, datetime: `${date} ${dayjs(billdata.datetime).format('HH:mm')}` })
    }
    const handleSelectTime = (time) => {
        setBilldata({ ...billdata, datetime: dayjs(billdata.datetime).format('YYYY-MM-DD ') + time })
    }
    const handleSelectType = (bigType, type) => {
        setBilldata({ ...billdata, big_type: bigType, type: type })
    }
    const handleSelectLedger = (value) => {
        setBilldata({ ...billdata, ledger_id: value })
    }
    const handleInout = () => {
        if (!income) {
            setBilldata({ ...billdata, big_type: '收入', type: '红包' })
        } else {
            setBilldata({ ...billdata, big_type: '餐饮', type: '餐饮' })
        }
        setIncome(income => !income)
    }
    const handleFold = () => {
        setOpen(prev => !prev)
    }
    const handleSubmit = () => {
        if (billdata.count === '') {
            toast({
                variant: 'destructive',
                title: (
                    <div className="flex flex-row items-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        金额不能为空！
                    </div>
                )
                ,
            })
            return;
        }
        const actualCount = income ? Number.parseFloat(billdata.count) : -billdata.count;
        onSubmit('confirm', { ...billdata, count: actualCount });
        if (data === null) setBilldata(emptyData(globalState.selectedLedger));
        toast({
            variant: 'success',
            title: (
                <div className="flex flex-row items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    保存成功
                </div>
            )
            ,
        })
        if (!full) {
            setOpen(false)
        }
        playAnimation();
    }
    const handleDelete = () => {
        onSubmit('delete', billdata);
        toast({
            variant: 'success',
            title: (
                <div className="flex flex-row items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    删除成功
                </div>
            )
            ,
        })
    }
    const checkOption = (option) => {
        if (findOptionCheck(option)) {
            setBilldata({ ...billdata, options: billdata.options.filter(options => options !== option) })
        } else {
            setBilldata({ ...billdata, options: [...billdata.options, option] })
        }
    }
    const findOptionCheck = (option) => {
        return billdata.options.includes(option);
    }
    const playAnimation = () => {
        if (transition) {
            boxRef.current.style.transform = 'translateY(5px)';
            boxRef.current.style.opacity = '0';

            const timer = setTimeout(() => {
                boxRef.current.style.transform = '';
                boxRef.current.style.opacity = '1';
                if (autofocus) {
                    inputRef.current.focus();
                }

                clearTimeout(timer);
            }, 200)
        }
    }

    return (
        <div ref={boxRef} className={cn(" flex flex-col transition-all relative overflow-hidden pt-4 select-none", className)}>
            {!full &&
                <div className=" absolute top-1 left-0 w-full h-1">
                    <span onClick={handleFold} className=" bg-clip-padding block cursor-pointer w-[86px] border-2 border-transparent mx-auto h-2 rounded-full bg-zinc-300" />
                </div>
            }
            <div className="inputUnderline h-[46px] flex flex-row items-center bg-zinc-100 dark:bg-zinc-700 focus-within:bg-white dark:focus-within:bg-transparent border dark:border-zinc-600 rounded-md mb-3">
                <TypePicker icontype={income ? 'in' : 'out'} onSelectType={handleSelectType}>
                    <Button className="m-0 py-0 h-full px-1 pr-3 rounded-none" variant="ghost">
                        <Icons name={billdata.type} />
                        <p className=" whitespace-nowrap text-md">{billdata.type}</p>
                    </Button>
                </TypePicker>

                <Separator className="h-[28px]" orientation="vertical" />
                <button onClick={handleInout} className=" h-full px-1 pr-0">
                    {income ? <Plus strokeWidth={2.8} className=" text-red-600 w-5 h-5 " /> : <Minus strokeWidth={3} className=" text-green-600 w-5 h-5" />}
                </button>
                <input
                    ref={inputRef}
                    type="number"
                    min={0}
                    value={billdata.count}
                    onInput={handleInputCount}
                    onKeyDown={handleInputDown}
                    className={cn(" min-w-0 bg-transparent outline-none p-3 pl-0 h-full flex-1 font-semibold text-lg placeholder:font-normal placeholder:text-base",
                        income ? "text-red-600" : "text-green-600"
                    )}
                    placeholder="计入账单..."
                />
            </div>

            {(open || full) &&
                <ScrollArea className="flex-1 mb-3">
                    <div className=" flex flex-col text-zinc-600 mb-3">
                        <span className="text-zinc-600 dark:text-zinc-200 font-semibold text-sm pl-[2px] mb-1">时间</span>
                        <div className="flex flex-row">
                            <Datepicker defaultDate={dayjs(billdata.datetime).toDate()} onSelectDate={handleSelectDate}>
                                <Button
                                    className="bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-200 focus-within:bg-white dark:focus-within:bg-transparent h-[42px] text-zinc-900 inputUnderline border dark:border-zinc-600 flex flex-row items-center gap-1 border-r-0  hover:bg-zinc-200 rounded-md rounded-r-none p-[10px] px-3 text-sm"
                                >
                                    {dayjs(billdata.datetime).format('M月DD日')}
                                    <CalendarDays className=" w-4 h-4 text-zinc-600 dark:text-zinc-200" />
                                </Button>
                            </Datepicker>
                            <Timepicker defaultTime={dayjs(billdata.datetime).format('HH:mm')} onSelectTime={handleSelectTime}>
                                <Button className="bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-200 focus-within:bg-white dark:focus-within:bg-transparent h-[42px] text-zinc-900 inputUnderline border dark:border-zinc-600 flex flex-row items-center gap-1 hover:bg-zinc-200 rounded-md rounded-l-none p-[10px] text-sm">
                                    {dayjs(billdata.datetime).format('HH:mm')}
                                    <ChevronsUpDown className=" w-4 h-4 text-zinc-600 dark:text-zinc-200" />
                                </Button>
                            </Timepicker>
                        </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                        <span className="text-zinc-600 dark:text-zinc-200 font-semibold text-sm pl-[2px] mb-[3px]">账本</span>
                        <div>
                            <LedgerSelector
                                className="bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-200 focus-within:bg-white dark:focus-within:bg-transparent inputUnderline border dark:border-zinc-600 hover:bg-zinc-200 rounded-md p-[10px] px-3 text-sm"
                                value={billdata.ledger_id}
                                onChangeValue={handleSelectLedger}
                                iconless
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                        <span className="text-zinc-600 dark:text-zinc-200 font-semibold text-sm pl-[2px] mb-[3px]">备注</span>
                        <div className="inputUnderline">
                            <input value={billdata.note} onChange={handleInputNote} type="text" className="w-full bg-zinc-100 dark:bg-zinc-700 focus-within:bg-white dark:focus-within:bg-transparent border dark:border-zinc-600 p-[10px] rounded-md outline-none text-sm px-3" placeholder="添加账单备注" />
                        </div>
                    </div>
                    <div className=" flex flex-col mb-3">
                        <span className="text-zinc-600 dark:text-zinc-200 font-semibold text-sm pl-[2px] mb-1">更多选项</span>
                        <div className=" flex flex-row flex-wrap gap-1">
                            <div className="flex items-center space-x-1 border dark:border-zinc-600 rounded-lg px-3 py-2 ">
                                <Checkbox id='已报销' checked={findOptionCheck('已报销')} onCheckedChange={() => checkOption('已报销')} />
                                <label htmlFor="已报销" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    已报销
                                </label>
                            </div>

                        </div>
                    </div>
                    {!full && <Separator />}
                </ScrollArea>
            }
            {full && <Separator className=" mb-4" />}
            <div className="flex gap-2">
                {edit && <Button onClick={handleDelete} variant='ghost' className=" w-16 text-red-600 hover:bg-red-100 hover:text-red-700">删除</Button>}
                <Button onClick={handleSubmit} className="flex-1 py-[10px] active:bg-primary/75 dark:text-zinc-200">确认记账</Button>
            </div>

        </div>
    )
}

export default InputCard;