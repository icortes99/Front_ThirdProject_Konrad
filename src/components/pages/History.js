import Navbar from '../subcomponents/Navbar'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/History.scss'

function History(){
    const block = 'history'
    const historyHardCoded = [{
        idTransaction: '33321',
        origin: 'Eladio Carrion',
        originAccount: 2994827183912,
        amount: 45000.50,
        destiny: 'Lebron James',
        destinyAccount: 574839205748,
        date: '22/4/20'
    },{
        idTransaction: '33322',
        origin: 'Eladio Percocet',
        originAccount: 2994827183912,
        amount: 69000.50,
        destiny: 'Lebron James',
        destinyAccount: 574839205748,
        date: '25/4/20'
    },{
        idTransaction: '31121',
        origin: 'Grimson Carrion',
        originAccount: 2994827183912,
        amount: 45000.50,
        destiny: 'Safaera James',
        destinyAccount: 574839205748,
        date: '22/4/22'
    }]
    const userLoggedIn = sessionStorage.getItem('token')

    const servicesHardCoded = []

    return(
        <>
            { userLoggedIn !== null ?<>
                <Navbar page={4}/>
                <div className={`${block}__root`}>
                    <h1>History</h1>
                    <table className={`${block}__logs-container`}>
                        <tr className={`${block}__logs-container__log--head`}>
                            <th>Origin</th>
                            <th>Origin account</th>
                            <th>Amount</th>
                            <th>Destiny</th>
                            <th>Destiny account</th>
                            <th>Date</th>
                        </tr>
                    { historyHardCoded.map((x)=>{
                        return(
                            <tr>
                                <td>{x.origin}</td>
                                <td>{x.originAccount}</td>
                                <td>{x.amount}</td>
                                <td>{x.destiny}</td>
                                <td>{x.destinyAccount}</td>
                                <td>{x.date}</td>
                            </tr>
                        )
                    })}
                    </table>
                </div>
                <Footer/>
            </> : <h1>You have not access to this page</h1>}
        </>
    )
}

export default History