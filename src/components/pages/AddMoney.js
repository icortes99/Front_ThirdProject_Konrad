import { useState } from 'react'
import Footer from '../subcomponents/Footer'
import Navbar from '../subcomponents/Navbar'
import '../../styles/components/pages/AddMoney.scss'
import InfoModal from '../subcomponents/InfoModal'

function AddMoney(){
    const block = 'addMoney'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const accountsData = sessionData[0].accounts
    let currenciesData = sessionData[1]
    /*<button onClick={()=>setState(!state)}>Toggle</button> 
    <InfoModal
    visible={state}
    setVisible={setState}
    toggle={1}
    time={2000}
    msg='Everything`s good'/>
    */
    const userLoggedIn = sessionStorage.getItem('data').token

    const verify = ()=>{
        console.log('verifying')
        //verify inputs
        //call modal
        //if everything good reset inputs
    }

    return(
        <>{
            sessionData[0].token !== null ? <>
                <Navbar page={5}/>
                <main className={`${block}__root`}>
                    <h1>Add money</h1>
                    <section className={`${block}__root__section`}>
                        <h2>Origin</h2>
                        <form>
                            <div className={`${block}__form__input-container`}>
                                <label htmlFor='originAccN'>Account number: </label>
                                <input className={`${block}__form__input`} id='originAccN' type='number'/>
                            </div>

                            <div className={`${block}__form__input-container`}>
                                <label htmlFor='originAmount'>Amount: </label>
                                <input className={`${block}__form__input`} id='originAmount'/>
                            </div>
                        </form>
                    </section>
                    <section className={`${block}__root__section`}>
                        <h2>Destiny</h2>
                        <form className={`${block}__form__input-container`}>
                            <label htmlFor='destinyAccN'>Destiny account: </label>
                            <select className={`${block}__form__input--select`} name='incomeSource' id='destinyAccN'>
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
                        <div className={`${block}__btn-container`}>
                            <button className={`${block}__btn-pay`} onClick={verify}>Transfer</button>
                        </div>
                    </section>
                </main>
                <Footer/>
            </>
            : <main><h1>You have not access to this page</h1></main>
        }</>
    )
}

export default AddMoney