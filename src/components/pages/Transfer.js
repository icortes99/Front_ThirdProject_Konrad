import { useState } from 'react'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/Transfer.scss'
import Navbar from '../subcomponents/Navbar'

function Transfer(){
    const block = 'transfer'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const accountsData = sessionData[0].accounts
    let currenciesData = sessionData[1]
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
    const [ownerDestiny, setOwnerDestiny] = useState('The account does not exist')

    const verify = ()=>{
        console.log('verifying')
        //verify inputs
        //call modal
        //if everything good reset inputs
    }

    return(
        <>
            { sessionData[0].token !== null ? <>
                <Navbar page={5}/>
                <main className={`${block}__root`}>
                    <h1>Transfer</h1>
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
                                            <option value={x.accountNumber} key={i}>{currency.prefix}{x.accountNumber}</option>
                                        )
                                    })
                                }
                            </select>
                        </form>
                    </section>
                    <section className={`${block}__root__section`}>
                        <h2>Destiny</h2>
                        <form className={`${block}__form__input-container`}>
                            <label className={`${block}__form__label`} htmlFor='destinyAccN'>Account number: </label>
                            <input className={`${block}__form__input`} id='destinyAccN' type='number'/>
                        </form>
                        <p className={`${block}__destiny-user`}>{ownerDestiny}</p>
                        <form className={`${block}__form__input-container`}>
                            <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                            <input className={`${block}__form__input`} id='destinyAmount'/>
                        </form>
                        <div className={`${block}__btn-container`}>
                            <button className={`${block}__btn-pay`} onClick={verify}>Transfer</button>
                        </div>
                    </section>
                </main>
                <Footer/>
            </> : <main><h1>You have not access to this page</h1></main>}
        </>
    )
}

export default Transfer