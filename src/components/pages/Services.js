import Navbar from '../subcomponents/Navbar'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/Services.scss'

function Services(){
    const block = 'services'
    const userLoggedIn = sessionStorage.getItem('data').token
    const hardCodedListAccounts = [{
        "accountNumber": 9999999099999999,
        "currencyCode": 2,
        "accountBalance": 250.44,
        "userIdUser": 14783926
    }, {
        "accountNumber": 9999999099999999,
        "currencyCode": 2,
        "accountBalance": 250.44,
        "userIdUser": 14783926
    }, {
        "accountNumber": 9999999099999999,
        "currencyCode": 2,
        "accountBalance": 250.44,
        "userIdUser": 14783926
    },{
        "accountNumber": 9999999099999999,
        "currencyCode": 2,
        "accountBalance": 250.44,
        "userIdUser": 14783926
    }]
    const servicesHardCoded = [{
        name: 'Electricity'
    },{
        name: 'Water'
    },{
        name: 'Taxes'
    },{
        name: 'Cellphone'
    }]

    const verify = ()=>{
        console.log('verifying')
        //verify inputs
        //call modal
        //if everything good reset inputs
    }

    return(
        <>
            { userLoggedIn !== null ? <>
                <Navbar
                page={4}/>
                <div className={`${block}__root`}>
                        <h1>Services</h1>
                        <section className={`${block}__root__section`}>
                            <h2>Origin</h2>
                            <form>
                                <label htmlFor='originAccN' className={`${block}__form__label`}>Origin account: </label>
                                <select name='incomeSource' id='originAccN'>
                                    {
                                        hardCodedListAccounts.map((x, i)=>{
                                            return(
                                                <option value={x.accountNumber} key={i}>{x.accountNumber}</option>
                                            )
                                        })
                                    }
                                </select>
                            </form>
                        </section>
                        <section className={`${block}__root__section`}>
                            <h2>Service</h2>
                            <form onSubmit={verify}>
                                <div>
                                    <label htmlFor='inService' className={`${block}__form__label`}>Category: </label>
                                    <select name='service' id='inService'>
                                        {
                                            servicesHardCoded.map((x, i)=>{
                                                return(
                                                    <option value={x.name} key={i}>{x.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label className={`${block}__form__label`} htmlFor='destinyAccN'>Bill number: </label>
                                    <input className={`${block}__form__input`} id='destinyAccN' type='number' required/>
                                </div>
                                <div>
                                    <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                    <input className={`${block}__form__input`} id='destinyAmount' required/>
                                </div>
                                <button className={`${block}__btn-pay`} onClick={verify}>Pay</button>
                            </form>
                        </section>
                    </div>
                <Footer/>
            </> : <h1>You have not access to this page</h1>}
        </>
    )
}

export default Services