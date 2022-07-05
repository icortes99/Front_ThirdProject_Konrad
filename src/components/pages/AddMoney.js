import { useState } from 'react'
import Footer from '../subcomponents/Footer'
import '../../styles/components/pages/AddMoney.scss'
import InfoModal from '../subcomponents/InfoModal'

function AddMoney(){
    const block = 'addMoney'
    const [state, setState] = useState(false)
    /*<button onClick={()=>setState(!state)}>Toggle</button> 
    <InfoModal
    visible={state}
    setVisible={setState}
    toggle={1}
    time={2000}
    msg='Everything`s good'/>
    */
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
    const userLoggedIn = sessionStorage.getItem('data').token

    const verify = ()=>{
        console.log('verifying')
        //verify inputs
        //call modal
        //if everything good reset inputs
    }

    return(
        <>{
            userLoggedIn !== null ?
            <div className={`${block}__root`}>
                <div className={`${block}__main`}>
                    <h1>Add money</h1>
                    <section>
                        <h2>Origin</h2>
                        <form>
                            <div>
                                <label htmlFor='originAccN'>Account number: </label>
                                <input id='originAccN' type='number'/>
                            </div>

                            <div>
                                <label htmlFor='originAmount'>Amount: </label>
                                <input id='originAmount'/>
                            </div>
                        </form>
                    </section>
                    <section>
                        <h2>Destiny</h2>
                        <form>
                            <label htmlFor='destinyAccN'>Destiny account: </label>
                            <select name='incomeSource' id='destinyAccN'>
                                {
                                    hardCodedListAccounts.map((x, i)=>{
                                        return(
                                            <option value={x.accountNumber} key={i}>{x.accountNumber}</option>
                                        )
                                    })
                                }
                            </select>
                        </form>
                        <button onClick={verify}>Transfer</button>
                    </section>
                </div>
                <Footer/>
            </div> : <h1>You have not access to this page</h1>
        }</>
    )
}

export default AddMoney