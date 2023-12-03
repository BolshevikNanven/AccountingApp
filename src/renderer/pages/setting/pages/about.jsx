import Card from "../../../components/card/settingCard"

import { Mail, Github } from 'lucide-react'

export default function About() {



    return (
        <div className=' w-full flex flex-col'>
            <h3 className=' text-2xl font-semibold select-none my-2 pb-2'>关于</h3>
            <div className=' table border-collapse border-spacing-0'>
                <Card>
                    <div className='flex flex-row justify-between items-center select-none'>
                        <p className='text-zinc-900 dark:text-zinc-200'>版本更新</p>
                        <button disabled className=' border rounded shadow-sm px-4 py-1 text-sm cursor-default disabled:bg-transparent disabled:text-zinc-500 disabled:cursor-not-allowed hover:bg-zinc-50 active:bg-zinc-100 mr-2'>检查更新</button>
                    </div>
                </Card>
                <Card>
                    <div className='flex flex-col gap-1 cursor-default'>
                        <p className='text-zinc-800 dark:text-zinc-300  text-sm'>当前版本号：<span className='text-zinc-600 px-2'>v0.0.1</span></p>
                        <p className='text-zinc-800 dark:text-zinc-300  text-sm'>更新日期：<span className='text-zinc-600 px-2'>2023年11月11日</span></p>
                    </div>
                </Card>
            </div>
            <p className='flex flex-row self-baseline text-sm items-center text-zinc-600 p-2 cursor-default rounded dark:hover:bg-zinc-800 hover:bg-zinc-100 mt-1'>
                <Mail className=' w-4 h-4 mr-2' />icedeerwanna@outllok.com
            </p>
            <p onClick={() => window.electron.ipcRenderer.sendMessage('openExternal', 'https://github.com/BolshevikNanven/AccountingApp')}
                className='flex flex-row self-baseline text-sm items-center text-sky-600 p-2 rounded dark:hover:bg-zinc-800 hover:bg-zinc-100 hover:underline cursor-pointer'>
                <Github className=' w-4 h-4 mr-[6px] text-zinc-600' />代码仓库
            </p>
            <p className='p-2 text-sm select-none'>© 2023 Nanven.</p>
        </div>
    )
}