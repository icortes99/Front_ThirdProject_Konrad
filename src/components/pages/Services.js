import Navbar from '../subcomponents/Navbar'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/Services.scss'

function Services(){
    const block = 'services'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const accountsData = sessionData[0].accounts
    let currenciesData = sessionData[1]
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
            { sessionData[0].token !== null ? <>
                <Navbar
                page={5}/>
                <main className={`${block}__root`}>
                    <h1>Services</h1>
                    <section className={`${block}__root__section`}>
                        <h2>Origin</h2>
                        <form className={`${block}__form__input-container`}>
                            <label htmlFor='originAccN' className={`${block}__form__label`}>Origin account: </label>
                            <select className={`${block}__form__input--select`} name='incomeSource' id='originAccN'>
                                {
                                    accountsData.map((x, i)=>{
                                        let currency
                                        currenciesData.forEach((y) => {
                                            if(x.currencyCode === y.idCurrency){
                                                currency = y
                                            }
                                        })
                                        return(
                                            <option 
                                            value={x.accountNumber} 
                                            key={i}>{currency.prefix}{x.accountNumber}</option>
                                        )
                                    })
                                }
                            </select>
                        </form>
                    </section>
                    <section className={`${block}__root__section`}>
                        <h2>Service</h2>
                        <form onSubmit={verify}>
                            <div className={`${block}__form__input-container`}>
                                <label htmlFor='inService' className={`${block}__form__label`}>Category: </label>
                                <select className={`${block}__form__input--select`} name='service' id='inService'>
                                    {
                                        servicesHardCoded.map((x, i)=>{
                                            return(
                                                <option value={x.name} key={i}>{x.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={`${block}__form__input-container`}>
                                <label className={`${block}__form__label`} htmlFor='destinyAccN'>Bill number: </label>
                                <input className={`${block}__form__input`} id='destinyAccN' type='number' required/>
                            </div>
                            <div className={`${block}__form__input-container`}>
                                <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                <input className={`${block}__form__input`} id='destinyAmount' required/>
                            </div>
                            <div className={`${block}__btn-container`}>
                                <button className={`${block}__btn-pay`} onClick={verify}>Pay</button>
                            </div>
                        </form>
                    </section>
                </main>
                <Footer/>
            </> : <main><h1>You have not access to this page</h1></main>}
        </>
    )
}

export default Services