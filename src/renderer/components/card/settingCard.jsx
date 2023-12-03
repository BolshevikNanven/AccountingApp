export default function Card({ children }) {
    return (
        <div className=' bg-zinc-50 dark:bg-zinc-800 px-3 py-4 pt-3 border border-t-0 first:rounded-t-sm dark:first:bg-zinc-700/50 first:bg-white first:pt-4  first:border-t last:rounded-b-sm min-h-[64px]'>
            {children}
        </div>
    )
}