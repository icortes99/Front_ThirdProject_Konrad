import Navbar from '../subcomponents/Navbar'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/History.scss'
import Log from '../subcomponents/Log'

function History(){
    const block = 'history'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const user = sessionData[0]
    const logsData = user.transactions
    let currenciesData = sessionData[1]

    return(
        <>
            { sessionData[0].token !== null ?<>
                <Navbar page={5}/>
                <div className={`${block}__root`}>
                    <h1>History</h1>
                    { logsData[0][0] !== [] && logsData[0][1] !== [] &&
                    <table className={`${block}__logs-container`}>
                        <thead>
                            <tr >
                                <th>Origin</th>
                                <th>Origin account</th>
                                <th>Amount</th>
                                <th>Destiny</th>
                                <th>Destiny account</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                            <tbody>
                                { logsData[0][0] !== [] && 
                                logsData[0][0].map((x, i)=>{
                                    let amountCurrency
                                    currenciesData.forEach(y => {
                                        if(x.currencyCode === y.idCurrency){
                                            amountCurrency = y
                                        }
                                    });
                                    let date = new Date(x.transactionDate).toISOString().split("T")[0]
                                    return(
                                        <tr key={i}>
                                            <td>{x.sender}</td>
                                            <td>{x.senderAccount}</td>
                                            <td>{amountCurrency.symbol}{x.amount}</td>
                                            <td>{x.receiver}</td>
                                            <td>{x.receiverAccount}</td>
                                            <td>{date}</td>
                                        </tr>
                                    )
                                })}
                            
                                { logsData[0][1] !== [] && 
                                logsData[0][1].map((x, i)=>{
                                    let amountCurrency
                                    currenciesData.forEach(y => {
                                        if(x.currencyCode === y.idCurrency){
                                            amountCurrency = y
                                        }
                                    });
                                    let date = new Date(x.transactionDate).toISOString().split("T")[0]
                                    return(
                                        <tr key={i}>
                                            <td>{x.sender}</td>
                                            <td>{x.senderAccount}</td>
                                            <td>{amountCurrency.symbol}{x.amount}</td>
                                            <td>{x.receiver}</td>
                                            <td>{x.receiverAccount}</td>
                                            <td>{date}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>}

                    <table className={`${block}__logs-container`}>
                        <thead>
                            <tr className={`${block}__logs-container__log--head`}>
                                <th>Destiny</th>
                                <th>Destiny account</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            { logsData[1] !== [] &&
                            logsData[1].map((x, i)=>{
                                let amountCurrency
                                currenciesData.forEach(y => {
                                    if(x.currencyCode === y.idCurrency){
                                        amountCurrency = y
                                    }
                                })
                                let date = new Date(x.transactionDate).toISOString().split("T")[0]
                                return(
                                    <tr key={i}>
                                        <td>{x.receiver}</td>
                                        <td>{x.receiverAccount}</td>
                                        <td>{amountCurrency.symbol}{x.amount}</td>
                                        <td>{date}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <table className={`${block}__logs-container`}>
                        <thead>
                            <tr className={`${block}__logs-container__log--head`}>
                                <th>Origin</th>
                                <th>Origin account</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            { logsData[2] !== [] &&
                            logsData[2].map((x, i)=>{
                                let amountCurrency
                                currenciesData.forEach(y => {
                                    if(x.currencyCode === y.idCurrency){
                                        amountCurrency = y
                                    }
                                })
                                let date = new Date(x.transactionDate).toISOString().split("T")[0]
                                return(
                                    <tr key={i}>
                                        <td>{x.sender}</td>
                                        <td>{x.senderAccount}</td>
                                        <td>{amountCurrency.symbol}{x.amount}</td>
                                        <td>{date}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className={`${block}__logs-mobile`}>
                        { logsData[0][0] !== [] && 
                            logsData[0][0].map((x, i)=>{
                                let amountCurrency
                                currenciesData.forEach(y => {
                                    if(x.currencyCode === y.idCurrency){
                                        amountCurrency = y
                                    }
                                })
                                return(
                                    <Log
                                    obj={x}
                                    key={i}
                                    title={'Local transaction sent'}/>
                                )
                            })}

                            { logsData[0][0] !== [] && 
                            logsData[0][0].map((x, i)=>{
                                let amountCurrency
                                currenciesData.forEach(y => {
                                    if(x.currencyCode === y.idCurrency){
                                        amountCurrency = y
                                    }
                                })
                                return(
                                    <Log
                                    obj={x}
                                    key={i}
                                    title={'Local transaction received'}/>
                                )
                            })}

                            { logsData[1] !== [] && 
                            logsData[1].map((x, i)=>{
                                let amountCurrency
                                currenciesData.forEach(y => {
                                    if(x.currencyCode === y.idCurrency){
                                        amountCurrency = y
                                    }
                                })
                                return(
                                    <Log
                                    obj={x}
                                    key={i}
                                    title={'External transaction receive'}/>
                                )
                            })}

                            { logsData[2] !== [] && 
                            logsData[2].map((x, i)=>{
                                let amountCurrency
                                currenciesData.forEach(y => {
                                    if(x.currencyCode === y.idCurrency){
                                        amountCurrency = y
                                    }
                                })
                                return(
                                    <Log
                                    obj={x}
                                    key={i}
                                    title={'External transaction sent'}/>
                                )
                            })}
                    </div>
                </div>
                <Footer/>
            </> : <h1>You have not access to this page</h1>}
        </>
    )
}

export default History