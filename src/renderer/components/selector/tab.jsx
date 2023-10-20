import { cn } from "../../lib/utils"

export default function TabSelector({ className, value, onChangeValue = () => { }, valuesOption }) {


    return (
        <div className={cn("flex flex-row p-[2px] bg-zinc-200/50 rounded-md cursor-pointer select-none", className)}>
            {valuesOption.map(values =>
                <div
                    key={values}
                    className={cn("p-1 px-2 text-sm text-zinc-800 rounded-sm",
                        values === value && "bg-white")}
                    onClick={() => onChangeValue(values)}
                >
                    {values}
                </div>
            )}
        </div>
    )
}