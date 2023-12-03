import DropdownSelector from "../../../components/selector/dropdown"
import Card from "../../../components/card/settingCard"
import { useEffect, useMemo, useRef, useState } from "react"
import { BillIpc, DataIpc, LedgerIpc } from "../../../store/ipc"

import { Loader2, CheckCircle2, AlertCircle, XCircle, ArrowRight } from 'lucide-react'
import { useBilldata, useLedgerdata } from "../../../store/provider/data-provider"
import { useToast } from "../../../components/ui/toast/use-toast";
import dayjs from "dayjs"
import { nanoid } from "nanoid"
import { useGlobalState } from "../../../store/provider/state-provider"


export default function Convert() {

    const [loading, setLoading] = useState({ export: false, import: false })

    const [ledgerData, dispatchLedgerData] = useLedgerdata()
    const [globalState, dispatchGlobalStateData] = useGlobalState()
    const [allBillData, dispatchBilldata] = useBilldata()

    const [selectedLedger, setSelectedLedger] = useState({ label: '全部', id: 'all' })

    const [importData, setImportData] = useState([])
    const [importDataLedgerMap, setImportDataLedgerMap] = useState([])
    const [successMsg, setSuccessMsg] = useState()

    const { toast } = useToast();
    const inputRef = useRef()


    const ledger = useMemo(() => {
        return [{ label: '全部', id: 'all' }, ...ledgerData?.map(l => ({ label: l.name, id: l.id }))]
    }, [ledgerData])

    const submitExport = async () => {
        let ledgerMap = new Map()
        let billData

        setLoading(prev => ({ ...prev, export: true }))
        ledgerData.forEach(l => ledgerMap.set(l.id, l.name))

        if (selectedLedger.id === 'all') {
            billData = await BillIpc.get()
        } else billData = await BillIpc.get(selectedLedger.id)

        billData = billData.map(bill => ({ ...bill, ledger_name: ledgerMap.get(bill.ledger_id) }))


        DataIpc.export({ data: billData, pattern: 'csv', name: `account${dayjs().format('YYYY-MM-DD')}[${selectedLedger.label}]` }).then(res => {
            setLoading(prev => ({ ...prev, export: false }))
            toast({
                variant: 'success',
                title: (
                    <div className="flex flex-row items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        导出成功
                    </div>
                )
            })
            setSuccessMsg(res)
        })
    }

    const submitImportData = async () => {

        setLoading(prev => ({ ...prev, import: true }))
        importDataLedgerMap.forEach((importLedger) => {
            let billData = [];
            let newLedgerId

            if (importLedger.id === importLedger.targetId) {
                billData = importData.filter(v => v.ledger_name === importLedger.name)
            } else billData = importData.filter(v => v.ledger_name === importLedger.name).map(v => ({ ...v, id: nanoid() }))

            if (importLedger.targetId === '新账本') {
                newLedgerId = nanoid()
                LedgerIpc.add({
                    id: newLedgerId,
                    name: '新' + billData[0].ledger_name,
                    create_time: dayjs().format('YYYY-MM-DD HH:mm'),
                    update_time: dayjs().format('YYYY-MM-DD HH:mm'),
                    note: '',
                    color: '#fde68a',
                })
            } else newLedgerId = importLedger.targetId

            billData.forEach(async(bill) => {
                await BillIpc.add(
                    {
                        id: bill.id,
                        datetime: bill.datetime,
                        big_type: bill.big_type,
                        type: bill.type,
                        count: bill.count,
                        note: bill.note,
                        options: bill.options,
                        ledger_id: newLedgerId,
                    },
                    dayjs().format('YYYY-MM-DD HH:mm')
                )
            })

        })

        LedgerIpc.get().then(res => dispatchLedgerData({ type: 'INIT', payload: res }))
        BillIpc.get(globalState.selectedLedger).then((res) => {
            dispatchBilldata({ type: 'INIT', payload: res })
        })

        setLoading(prev => ({ ...prev, import: false }))
        toast({
            variant: 'success',
            title: (
                <div className="flex flex-row items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    导入成功
                </div>
            )
        })

    }

    const getFileName = (pathname) => {
        const res = pathname.split('\\')
        return res[res.length - 1]
    }

    const handleOpenExplorer = () => {
        const pathname = successMsg.substr(0, successMsg.lastIndexOf('\\'))
        window.electron.ipcRenderer.sendMessage('openExplorer', pathname)
    }

    const handleSelectFile = (e) => {

        if (e.target.files.length === 0) {
            return
        }

        const file = e.target.files[0]
        const reader = new FileReader()

        if (file.name.substr(file.name.lastIndexOf('.')) !== '.csv') {
            toast({
                variant: 'destructive',
                title: (
                    <div className="flex flex-row items-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        仅支持导入csv文件
                    </div>
                )
            })
            return
        }

        reader.onload = (event) => {
            const result = event.target.result;
            const lines = result.split(/\r\n|\n/)

            let index = 0
            let data = []

            const header = lines[index].split(',')

            for (index = 1; index < lines.length - 1; index++) {
                const value = lines[index].split(',')
                let dataObj = {}

                value.forEach((v, i) => dataObj[header[i]] = v)
                data.push(dataObj)

            }
            setImportData([header, ...data])
            getImportLedger([header, ...data])

        }
        reader.onerror = (err) => {
            toast({
                variant: 'destructive',
                title: (
                    <div className="flex flex-row items-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        {err}
                    </div>
                )
            })
        }
        reader.readAsText(file)
        inputRef.current.value = ''
    }

    const getImportLedger = (data) => {
        let importLedgerMap = new Map()
        data.splice(1).forEach(bill => importLedgerMap.set(bill.ledger_name, bill.ledger_id))

        let importLedger = []
        importLedgerMap.forEach((v, k) => {
            importLedger.push({ id: v, name: k, targetId: '新账本', target: '新账本' })
        })

        setImportDataLedgerMap([...importLedger])

    }

    const handleChangeLedgerMap = (value, originValue) => {
        let newValue = { ...originValue, targetId: value.id, target: value.name }

        setImportDataLedgerMap(prev => prev.map(v => v.id === newValue.id ? newValue : v))
    }

    const renderImportData = useMemo(() => {
        if (importData.length === 0) {
            return
        }

        const values = importData.slice(1).map(d => ({
            datetime: d.datetime,
            big_type: d.big_type,
            type: d.type,
            count: d.count,
            note: d.note,
            options: d.options,
            ledger_name: d.ledger_name
        }))
        const header = Object.keys(values[0])

        return (
            <div className="flex flex-col border rounded max-h-[260px] overflow-y-auto">
                <div className="grid sticky top-0 left-0 select-none border-b bg-white dark:bg-black py-2 px-1 text-sm font-semibold" style={{ gridTemplateColumns: `repeat(${header.length},1fr)` }} >
                    {header.map(v => <p key={v}>{v}</p>)}
                </div>
                {values.map((data, index) => (
                    <div key={index} className="grid select-none odd:bg-white dark:odd:bg-black bg-transparent py-2 px-1 text-sm " style={{ gridTemplateColumns: `repeat(${Object.keys(data).length},1fr)` }} >
                        {Object.keys(data).map((k, i) => (
                            <p className=" whitespace-nowrap overflow-hidden text-ellipsis" title={data[k]} key={data[k] + index + i}>{data[k]}</p>
                        ))}
                    </div>
                ))}
            </div>
        )

    }, [importData])


    return (
        <div className=' w-full flex flex-col pb-14'>
            <h3 className=' text-2xl font-semibold select-none my-2 pb-2'>数据迁移</h3>
            <div className=' table border-collapse border-spacing-0 mb-3'>
                <Card>
                    <div className='flex flex-row justify-between items-center select-none'>
                        <p className='text-zinc-900 dark:text-zinc-200'>导出数据</p>
                        <div className="flex flex-row items-center">
                            {successMsg &&
                                <p onClick={handleOpenExplorer} className='flex flex-row text-sm items-center text-sky-600 dark:hover:bg-zinc-800 p-2 py-1 hover:bg-zinc-100 hover:underline cursor-pointer'>
                                    {getFileName(successMsg)}
                                </p>
                            }
                            {loading.export && <Loader2 className=" w-5 h-5 animate-spin" />}
                            <button onClick={submitExport} disabled={loading.export} className='dark:hover:bg-zinc-600 dark:active:bg-zinc-600/70 border ml-3 rounded shadow-sm px-4 py-1 text-sm cursor-default hover:bg-zinc-50 disabled:bg-transparent disabled:text-zinc-600 disabled:cursor-not-allowed active:bg-zinc-100 mr-2'>导出</button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className='flex flex-col gap-1 cursor-default'>
                        <p className='text-zinc-800 dark:text-zinc-300 text-sm flex flex-row items-center pb-1'>导出账本：
                            <DropdownSelector value={selectedLedger} label={(v) => v.label} onChangeValue={(v) => setSelectedLedger(v)} valuesOption={ledger} />
                        </p>
                        <p className='text-zinc-800 dark:text-zinc-300  text-sm flex flex-row items-center'>导出格式：
                            <DropdownSelector value={['csv']} valuesOption={['csv']} />
                        </p>
                    </div>
                </Card>
            </div>
            <div className=' table border-collapse border-spacing-0'>
                <Card>
                    <div className='flex flex-row justify-between items-center select-none'>
                        <p className='text-zinc-900 dark:text-zinc-200'>导入数据</p>
                        <input type="file" onChange={handleSelectFile} className=" hidden" accept=".csv" ref={inputRef} />
                        <button onClick={() => inputRef.current.click()} className='dark:hover:bg-zinc-600 dark:active:bg-zinc-600/70 border rounded shadow-sm px-4 py-1 text-sm cursor-default hover:bg-zinc-50 active:bg-zinc-100 mr-2'>选择文件</button>
                    </div>
                </Card>
                {importData.length !== 0 &&
                    <>
                        <Card>
                            <p className=" text-sm">预览：</p>
                            {renderImportData}
                            <div className=" flex flex-col mt-2">
                                <p className="text-sm select-none">检测到{importDataLedgerMap.length}个账本：</p>
                                {importDataLedgerMap.map((ledger, i) => (
                                    <div key={i} title="导入到" className="flex flex-row items-center text-sm select-none mt-1 self-baseline">
                                        {ledger.name}
                                        <ArrowRight className=" w-4 h-4 mx-1" />
                                        <DropdownSelector
                                            className=' border'
                                            value={{ id: ledger.targetId, name: ledger.target }}
                                            label={(v) => v.name}
                                            valuesOption={[{ id: '新账本', name: '新账本' }, ...ledgerData]}
                                            onChangeValue={(value) => handleChangeLedgerMap(value, ledger)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card>
                            <button onClick={submitImportData} disabled={loading.import} className='border rounded shadow-sm px-4 py-1 text-sm cursor-default bg-white dark:bg-black dark:hover:bg-zinc-700  dark:active:bg-zinc-700/50 hover:bg-zinc-50 active:bg-zinc-100 mr-2'>确认导入</button>
                            {loading.import && <Loader2 className=" w-5 h-5 animate-spin" />}
                        </Card>
                    </>
                }
            </div>
            <p className="flex flex-row items-center text-zinc-500 font-thin text-xs py-1 select-none">
                <AlertCircle className=" w-[14px] h-[14px] mr-1" />目前仅支持导入本软件数据
            </p>
        </div>
    )
}