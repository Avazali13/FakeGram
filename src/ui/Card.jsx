export default function Card({children,noPadding}){
    let classes="bg-slate-300 shadow-md shadow-gray-200 rounded-md p-4 mb-4 "
    if(!noPadding){
        classes+=' p-4'
    }
    return (
        <div className={classes}>
            {children}
        </div>
    )
}