import Navbar from '../subcomponents/Navbar'
import Footer from '../subcomponents/Footer'
import InfoModal from '../subcomponents/InfoModal'
import '../../styles/components/pages/Services.scss'
import { useState, useEffect } from 'react'

function Services(){
    const block = 'services'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const accountsData = sessionData[0].accounts
    let currenciesData = sessionData[1]
    const user = sessionData[0]
    const [btnAvailable, setBtnAvailable] = useState(false)
    const [everythingGood, setEverythingGood] = useState(false)
    const [modal, setModal] = useState(false)
    const [transferInfo, setTransferInfo] = useState({
        idTransaction: '',
        sender: user.idUser,
        senderAccount: '',
        currencyCode: 4,
        receiver: '',
        receiverAccount: 'CR12345678901234567890',
        amount: 0,
        description: 'Service payment',
        transactionDate: new Date()
    })
    const servicesHardCoded = [{
        name: 'Electricity'
    },{
        name: 'Water'
    },{
        name: 'Taxes'
    },{
        name: 'Cellphone'
    }]

    useEffect(()=>{
        if(btnAvailable){
            let temp = Math.floor(1000 + Math.random() * 9000) + 1
            setTransferInfo({
                ...transferInfo,
                idTransaction: temp
            })
        }
    }, [btnAvailable])

    useEffect(()=>{
        if(transferInfo.senderAccount !== '' && (transferInfo.amount !== 0 && transferInfo.amount !== '') && (transferInfo.description !== '')){
            if(transferInfo.receiverAccount.length === 10){
                setBtnAvailable(true)
            }
        } else {
            setBtnAvailable(false)
        }
    }, [transferInfo])

    const transferAction = (e)=>{
        e.preventDefault()

        if(btnAvailable){
            let accSend 
            accountsData.forEach((i)=>{
                if(i.accountNumber === transferInfo.senderAccount){
                    accSend = i
                }
            })
            console.log('balance: ', accSend.accountBalance)
            console.log('amount: ', transferInfo.amount)
            if(accSend.accountBalance >=  transferInfo.amount){
                fetch(`https://api-third-project.herokuapp.com/transaction/send`, {
                    method: 'POST',
                    headers: {
                        "Authorization": 'Bearer ' + sessionData[0].token,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(transferInfo)
                }).then(res=>res.json())
                .then(data => setEverythingGood(data))
                .catch(err => console.log('Error: ', err))
            } else {
                setEverythingGood(null)             
                setModal(true)
            }
        }
    }

    useEffect(()=>{
        if(everythingGood){
            if(!everythingGood.error){
                console.log('success message ', JSON.stringify(everythingGood))
                setModal(true)
                let list = user.accounts
                let newAmountObj
                list.forEach((x, i)=>{
                    if(x.accountNumber === transferInfo.senderAccount){
                        x.accountBalance = parseInt(x.accountBalance) - parseInt(transferInfo.amount)
                        user.accounts[i] = x
                        newAmountObj = x
                    }
                })
                sessionData[0] = user
                sessionStorage.setItem('data', JSON.stringify(sessionData))
                let newAmount = parseInt(newAmountObj.accountBalance)

                //fetch restar dinero, restar en session y mostrar modal
                fetch(`https://api-third-project.herokuapp.com/accounts/${transferInfo.senderAccount}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": 'Bearer ' + user.token,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({"accountBalance": newAmount})
                })
                .catch(err=>console.log(err))

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
            }
        }
    }, [everythingGood])

    const inputChange = (e)=>{
        setTransferInfo({
            ...transferInfo,
            [e.target.name]: e.target.value
        })
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
                            <select className={`${block}__form__input--select`} name='senderAccount' id='originAccN' onChange={inputChange}>
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
                        <form>
                            <div className={`${block}__form__input-container`}>
                                <label htmlFor='inService' className={`${block}__form__label`}>Category: </label>
                                <select className={`${block}__form__input--select`} name='description' id='inService' onChange={inputChange}>
                                    {
                                        servicesHardCoded.map((x, i)=>{
                                            return(
                                                <option value={`Service payment ${x.name}`} key={i}>{x.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className={`${block}__form__input-container`}>
                                <label className={`${block}__form__label`} htmlFor='destinyAccN'>Bill number: </label>
                                <input className={`${block}__form__input`} id='destinyAccN' type='number' required name='receiverAccount' onChange={inputChange} minLength={8} maxLength={8} value={transferInfo.receiverAccount}/>
                            </div>
                            <div className={`${block}__form__input-container`}>
                                <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                <input className={`${block}__form__input`} id='amount' name='amount' required onChange={inputChange} value={transferInfo.amount}/>
                            </div>
                            <div className={`${block}__btn-container`}>
                                <button className={btnAvailable ? `${block}__btn-pay` : `${block}__btn-pay ${block}__btn-pay--disabled`} onClick={transferAction}>Pay</button>
                            </div>
                        </form>
                    </section>

                    <InfoModal
                    visible={modal}
                    setVisible={setModal}
                    toggle={everythingGood && !everythingGood.error ? 1 : 0}
                    msg={everythingGood && !everythingGood.error ? 'Money added successfully' : 'Action failed'}
                    time={3000}/>
                </main>
                <Footer/>
            </> : <main><h1>You have not access to this page</h1></main>}
        </>
    )
}

export default Services