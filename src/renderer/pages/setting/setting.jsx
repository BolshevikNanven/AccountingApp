import { RefreshCw, AlertCircle, Server } from 'lucide-react'

import MainHeader from "../../components/mainHeader/MainHeader";
import { cn } from '../../lib/utils';
import { Link, useResolvedPath, useMatch, Routes, Route } from 'react-router-dom';

import About from './pages/about';
import Convert from './pages/convert';
import Storage from './pages/storage';

const linkCss = cn(" relative  px-3 pl-4 py-[7px] rounded w-[208px] text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 select-none transition-all hover:bg-zinc-200/80 active:bg-zinc-200/60 flex flex-row items-center")


export default function SettingPage() {

    const pathMatch = (path) => useMatch({ path: useResolvedPath(path).pathname, end: true })

    return (
        <div className="flex-1 flex flex-col h-full px-3 overflow-x-hidden">
            <MainHeader title="设置"></MainHeader>
            <div className=" relative flex-1 flex flex-row overflow-hidden">
                <header className="flex flex-col self-baseline p-2 pl-0 mr-3 gap-1 mt-2">
                    <Link to={'/settings/'} className={cn(linkCss, pathMatch('/settings/') && "bg-zinc-200/80 dark:bg-zinc-700")} onDragStart={(e) => e.preventDefault()}>
                        {pathMatch('/settings/') && <span className='absolute top-[9px] left-[2px] w-[3px] bg-[#0078d4] rounded h-[20px]' aria-hidden="true"></span>}
                        <Server className='h-4 w-4 mr-2' />存储
                    </Link>
                    <Link to={'/settings/convert'} className={cn(linkCss, pathMatch('/settings/convert') && "bg-zinc-200/80 dark:bg-zinc-700")} onDragStart={(e) => e.preventDefault()}>
                        {pathMatch('/settings/convert') && <span className='absolute top-[9px] left-[2px] w-[3px] bg-[#0078d4] rounded h-[20px]' aria-hidden="true"></span>}
                        <RefreshCw className='h-4 w-4 mr-2' />数据迁移
                    </Link>
                    <Link to={'/settings/about'} className={cn(linkCss, pathMatch('/settings/about') && "bg-zinc-200/80 dark:bg-zinc-700")} onDragStart={(e) => e.preventDefault()}>
                        {pathMatch('/settings/about') && <span className='absolute top-[9px] left-[2px] w-[3px] bg-[#0078d4] rounded h-[20px]' aria-hidden="true"></span>}
                        <AlertCircle className='h-4 w-4 mr-2' />关于
                    </Link>
                </header>
                <main className=" flex-1 overflow-y-auto p-2 px-4 mr-1">
                    <Routes>
                        <Route path='/' element={<Storage />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/convert' element={<Convert />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}
