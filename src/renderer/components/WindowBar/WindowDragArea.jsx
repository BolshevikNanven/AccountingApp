import  "./dragArea.css"
export default function WindowDragArea({ className, children }) {
    return (
        <div className={`drag ${className}`}>
            {children}
        </div>
    )
}