import '../../styles/components/subcomponents/Log.scss'

function Log(props){
    const {obj, title} = props
    let date = new Date(obj.transactionDate).toISOString().split("T")[0]
    const block = 'log'

    console.log(JSON.stringify(obj))
    return(

        <div className={`${block}__root`}>
            <p>{title}</p>
            <p>{date}</p>
            <p>{parseInt(obj.amount)}</p>
        </div>
    )
}

export default Log