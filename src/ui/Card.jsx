export default function Card({children,noPadding}){
    let classes="bg-slate-300 shadow-md shadow-gray-200 rounded-md p-1 mb-1 "
    if(!noPadding){
        classes+=' p-4'
    }
    return (
        <div className={classes}>
            {children}
        </div>
    )
}