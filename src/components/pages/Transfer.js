import { useState } from 'react'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/Transfer.scss'
import Navbar from '../subcomponents/Navbar'

function Transfer(){
    const block = 'transfer'
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
    const [ownerDestiny, setOwnerDestiny] = useState('The account does not exist')

    const verify = ()=>{
        console.log('verifying')
        //verify inputs
        //call modal
        //if everything good reset inputs
    }

    return(
        <>
            { userLoggedIn !== null ? <>
                <Navbar page={4}/>
                <div className={`${block}__root`}>
                    <div className={`${block}__main`}>
                        <h1>Transfer money</h1>
                        <section className={`${block}__main__section`}>
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
                        <section className={`${block}__main__section`}>
                            <h2>Destiny</h2>
                            <form>
                                <div>
                                    <label className={`${block}__form__label`} htmlFor='destinyAccN'>Account number: </label>
                                    <input className={`${block}__form__input`} id='destinyAccN' type='number'/>
                                </div>
                            </form>
                            <p className={`${block}__destiny-user`}>{ownerDestiny}</p>
                            <form>
                                <div>
                                    <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                    <input className={`${block}__form__input`} id='destinyAmount'/>
                                </div>
                            </form>
                            <button className={`${block}__btn-transfer`} onClick={verify}>Transfer</button>
                        </section>
                    </div>
                    <Footer/>
                </div>
            </> : <h1>You have not access to this page</h1>}
        </>
    )
}

export default Transfer