import { useEffect, useState } from 'react'
import Footer from '../subcomponents/Footer'
import Navbar from '../subcomponents/Navbar'
import '../../styles/components/pages/AddMoney.scss'
import InfoModal from '../subcomponents/InfoModal'

function AddMoney(){
    const block = 'addMoney'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const user = sessionData[0]
    const accountsData = user.accounts
    let currenciesData = sessionData[1]
    const [modal, setModal] = useState(false)
    const [everythingGood, setEverythingGood] = useState(false)
    const [btnAvailable, setBtnAvailable] = useState(false)
    const [transferInfo, setTransferInfo] = useState({
        idTransaction: '',
        sender: '',
        senderAccount: '',
        currencyCode: 0,
        receiver: user.idUser,
        receiverAccount: '',
        amount: 0,
        transactionDate: new Date()
    })
    /*<button onClick={()=>setState(!state)}>Toggle</button> 
    <InfoModal
    visible={state}
    setVisible={setState}
    toggle={1}
    time={2000}
    msg='Everything`s good'/>
    */

    const inputChange = (e)=>{
        setTransferInfo({
            ...transferInfo,
            [e.target.name]: e.target.value
        })
    }

    let cont = 1000
    useEffect(()=>{
        if(btnAvailable){
            let temp = Math.floor(1000 + Math.random() * 9000)
            setTransferInfo({
                ...transferInfo,
                idTransaction: temp
            })
            cont = cont + 1
        }
    }, [btnAvailable])

    const transferAction = ()=>{
        if(btnAvailable){
            console.log(JSON.stringify(transferInfo))
            fetch('https://api-third-project.herokuapp.com/transaction/receive', {
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + user.token,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(transferInfo)
            }).then(res=>res.json())
            .then(data => setEverythingGood(data))
            .catch(err => setEverythingGood(null))
        }
        //call modal
        //if everything good reset inputs
    }

    useEffect(()=>{
        if(everythingGood){
            setModal(true)
            setTransferInfo({
                idTransaction: '',
                sender: '',
                senderAccount: '',
                currencyCode: 0,
                receiver: user.idUser,
                receiverAccount: '',
                amount: '',
                transactionDate: new Date()
            })
            //add everything good to session storage
            if(!everythingGood.error){
                console.log('success message', JSON.stringify(everythingGood))
                user.transactions[1].push(everythingGood)
                let list = user.accounts
                let newAmountObj
                list.forEach((x, i)=>{
                    if(x.accountNumber === transferInfo.receiverAccount){
                        x.accountBalance = parseInt(x.accountBalance) + parseInt(transferInfo.amount)
                        user.accounts[i] = x
                        newAmountObj = x
                    }
                })
                sessionData[0] = user
                sessionStorage.setItem('data', JSON.stringify(sessionData))

                let newAmount = parseInt(newAmountObj.accountBalance)

                fetch(`https://api-third-project.herokuapp.com/accounts/${transferInfo.receiverAccount}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": 'Bearer ' + user.token,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({"accountBalance": newAmount})
                })
                .catch(err=>console.log(err))
                //update sssion amount
                //update backend
            }
        }
    }, [everythingGood])

    useEffect(()=>{
        if(transferInfo.senderAccount !== '' && transferInfo.receiverAccount !== '' && (transferInfo.amount !== 0 && transferInfo.amount !== '')){
            if(transferInfo.senderAccount.length === 22 || transferInfo.senderAccount.length === 23){
                let temp = transferInfo.senderAccount.split('')
                if((temp[0] === 'C') && (temp[1] === 'R') && (transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
                    setTransferInfo({
                        ...transferInfo,
                        currencyCode: 4
                    })
                    setBtnAvailable(true)
                } else if((temp[0] === 'U') && (temp[0] === 'S') && (temp[0] === 'D') && (transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
                    setTransferInfo({
                        ...transferInfo,
                        currencyCode: 14
                    })
                    setBtnAvailable(true)
                }
            }
        } else {
            setBtnAvailable(false)
        }
    }, [transferInfo])

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
                                <input className={`${block}__form__input`} id='originAccN' type='text' onChange={inputChange} name='senderAccount' value={transferInfo.senderAccount}/>
                            </div>

                            <div className={`${block}__form__input-container`}>
                                <label htmlFor='originAmount'>Amount: </label>
                                <input className={`${block}__form__input`} id='originAmount' type='number' onChange={inputChange} name='amount' value={transferInfo.amount}/>
                            </div>
                        </form>
                    </section>
                    <section className={`${block}__root__section`}>
                        <h2>Destiny</h2>
                        <form className={`${block}__form__input-container`}>
                            <label htmlFor='destinyAccN'>Destiny account: </label>
                            <select className={`${block}__form__input--select`} name='receiverAccount' id='destinyAccN' onChange={inputChange} value={transferInfo.receiverAccount}>
                                <option value=''>Choose an account</option>
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
                            <button className={btnAvailable ? `${block}__btn-pay` : `${block}__btn-pay ${block}__btn-pay--disabled`} onClick={transferAction}>Transfer</button>
                        </div>
                    </section>
                    { modal &&
                    <InfoModal
                    visible={modal}
                    setVisible={setModal}
                    toggle={everythingGood && !everythingGood.error ? 1 : 0}
                    msg={everythingGood && !everythingGood.error ? 'Money added successfully' : 'Action failed'}
                    time={3000}/>}
                </main>
                <Footer/>
            </>
            : <main><h1>You have not access to this page</h1></main>
        }</>
    )
}

export default AddMoney