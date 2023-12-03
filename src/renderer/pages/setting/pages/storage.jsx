import { useEffect, useState } from "react"
import Card from "../../../components/card/settingCard"
import { AlertCircle } from 'lucide-react'
import { computeNumber } from "../../../lib/utils"

export default function Storage() {

    const [databaseSize, setDatabaseSize] = useState()

    useEffect(() => {
        window.electron.ipcHandleInvoke('Data', 'getDatabaseFile').then(res => {
            const size = computeNumber(res, '/', 1024)
            setDatabaseSize(size >= 1024 ? computeNumber(size, '/', 1024) + 'MB' : size + 'KB')
        })
    }, [])

    return (
        <div className=' w-full flex flex-col'>
            <h3 className=' text-2xl font-semibold select-none my-2 pb-2'>存储</h3>
            <div className=' table border-collapse border-spacing-0'>
                <Card>
                    <div className='flex flex-row justify-between items-center select-none'>
                        <p className='text-zinc-900 dark:text-zinc-200'>数据库</p>
                        <div className="flex flex-row items-center">
                            <p className=" text-sm text-zinc-600 dark:text-zinc-400 mr-2">{databaseSize}</p>
                            <button
                                onClick={() => window.electron.ipcRenderer.sendMessage('openExplorer', 'database')}
                                className='dark:hover:bg-zinc-600 dark:active:bg-zinc-600/70 border rounded shadow-sm px-4 py-1 text-sm cursor-default hover:bg-zinc-50 active:bg-zinc-100 mr-2'>
                                打开
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            <p className="flex flex-row items-center text-zinc-500 font-thin text-xs py-1 select-none">
                <AlertCircle className=" w-[14px] h-[14px] mr-1" />SQlite3数据库
            </p>
        </div>
    )
}