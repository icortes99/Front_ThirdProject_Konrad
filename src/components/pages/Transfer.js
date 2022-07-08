import { useEffect, useState } from 'react'
import Footer from '../subcomponents/Footer'
import Navbar from '../subcomponents/Navbar'
import InfoModal from '../subcomponents/InfoModal'
import '../../styles/components/pages/Transfer.scss'

function Transfer(){
    const block = 'transfer'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    const accountsData = sessionData[0].accounts
    let currenciesData = sessionData[1]
    const user = sessionData[0]
    const [btnAvailable, setBtnAvailable] = useState(false)
    const [transferInfo, setTransferInfo] = useState({
        idTransaction: '',
        sender: user.idUser,
        senderAccount: '',
        currencyCode: 0,
        receiver: '',
        receiverAccount: '',
        amount: 0,
        transactionDate: new Date()
    })
    const [show, setShow] = useState(false)
    const [typeLF, setTypeLF] = useState(false)
    const [subtype, setSubtype] = useState(false)
    const [everythingGood, setEverythingGood] = useState(false)
    const [modal, setModal] = useState(false)

    //set idTransaction
    useEffect(()=>{
        if(btnAvailable){
            let temp = Math.floor(1000 + Math.random() * 9000)
            setTransferInfo({
                ...transferInfo,
                idTransaction: temp
            })
        }
    }, [btnAvailable])

    const transferAction = ()=>{
        if(btnAvailable){
            setTransferInfo({
                ...transferInfo,
                idTransaction: Date.now()
            })
            console.log(JSON.stringify(transferInfo))
            let url = ''
            if(typeLF === 'foreign'){
                url = 'send'
            } else {
                url = 'local'
                setTransferInfo({
                    ...transferInfo,
                    receiver: user.idUser
                })
            }
            let accSend 
            accountsData.forEach((i)=>{
                if(i.accountNumber === transferInfo.senderAccount){
                    accSend = i
                }
            })
            console.log('accounts', accountsData)
            console.log('saldo: ', accSend.senderAccount)
            console.log('monto: ', transferInfo.amount)
            if(accSend.accountBalance >=  transferInfo.amount){
                fetch(`https://api-third-project.herokuapp.com/transaction/${url}`, {
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
                
                setModal(true)
            }
        }
        //verify inputs
        //correct accountNUmber format, currency, enough money to do it
        //call modal
        //if everything good reset inputs
    }

    const resetTransferInfo = ()=>{
        setTransferInfo({
            idTransaction: '',
            sender: user.idUser,
            senderAccount: '',
            currencyCode: 0,
            receiver: '',
            receiverAccount: '',
            amount: 0,
            transactionDate: new Date()
        })
    }

    //listener of fetch transaction
    useEffect(()=>{
        if(everythingGood){
            //add everything good to session storage
            if(!everythingGood.error){
                setModal(true)
                console.log('success message', JSON.stringify(everythingGood))
                if(typeLF === 'foreign'){
                    user.transactions[2].push(everythingGood)
                } else {
                    user.transactions[0][0].push(everythingGood)
                }
                //user.transactions[1].push(everythingGood)
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

                fetch(`https://api-third-project.herokuapp.com/accounts/${transferInfo.senderAccount}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": 'Bearer ' + user.token,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({"accountBalance": newAmount})
                })
                .catch(err=>console.log(err))

                if(subtype === 'senderReceiver'){
                    let list2 = user.accounts
                    let newAmountObj2
                    list2.forEach((x, i)=>{
                        if(x.accountNumber === transferInfo.receiverAccount){
                            x.accountBalance = parseInt(x.accountBalance) + parseInt(transferInfo.amount)
                            user.accounts[i] = x
                            newAmountObj2 = x
                        }
                    })
                    let newAmount2 = parseInt(newAmountObj2.accountBalance)
                    sessionData[0] = user
                    sessionStorage.setItem('data', JSON.stringify(sessionData))
                    fetch(`https://api-third-project.herokuapp.com/accounts/${transferInfo.receiverAccount}`, {
                        method: 'PUT',
                        headers: {
                            "Authorization": 'Bearer ' + user.token,
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({"accountBalance": newAmount2})
                    })
                    .catch(err=>console.log(err))
                }
                
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

    //set btn available
    useEffect(()=>{
        //console.log('object: ', JSON.stringify(transferInfo))
        //console.log(subtype)
        if(typeLF === 'foreign'){
            if(transferInfo.senderAccount !== '' && transferInfo.receiverAccount !== '' && (transferInfo.amount !== 0 && transferInfo.amount !== '')){
                if(transferInfo.receiverAccount.length === 22 || transferInfo.receiverAccount.length === 23){
                    let temp = transferInfo.receiverAccount.split('')
                    if((temp[0] === 'C') && (temp[1] === 'R') && (transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
                        setTransferInfo({
                            ...transferInfo,
                            currencyCode: 4
                        })
                        setBtnAvailable(true)
                    }
                    if((temp[0] === 'U') && (temp[1] === 'S') && (temp[2] === 'D') && (transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
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
        } else {
            if(subtype === 'sender'){
                //look for other accounts
                if(transferInfo.senderAccount !== '' && transferInfo.receiverAccount !== '' && (transferInfo.amount !== 0 && transferInfo.amount !== '')){
                    console.log(transferInfo.receiverAccount.length, 'leng')
                    if(transferInfo.receiverAccount.length >= 22){
                        let temp = transferInfo.receiverAccount.split('')
                        if((temp[0] === 'C') && (temp[1] === 'R') && (transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
                            console.log('colones')
                            temp.shift()
                            temp.shift()
                            let temp2 = temp.join('')
                            setTransferInfo({
                                ...transferInfo,
                                currencyCode: 4,
                                receiverAccount: temp2
                            })

                            setBtnAvailable(true)
                        }
                        if((temp[0] === 'U') && (temp[1] === 'S') && (temp[2] === 'D') && (transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
                            console.log('dollar')
                            temp.shift()
                            temp.shift()
                            temp.shift()
                            let temp2 = temp.join('')
                            setTransferInfo({
                                ...transferInfo,
                                currencyCode: 14,
                                receiverAccount: temp2
                            })
                            /*setTransferInfo({
                                ...transferInfo,
                                receiverAccount: temp2
                            })*/
                            setBtnAvailable(true)
                        }
                    }
                } else {
                    setBtnAvailable(false)
                }




            } else {
                //same user, all accounts in session storage
                if(transferInfo.senderAccount !== '' && transferInfo.receiverAccount !== '' && (transferInfo.amount !== 0 && transferInfo.amount !== '')){
                    if(transferInfo.receiverAccount.length === 20){
                        if((transferInfo.currencyCode === 0 || transferInfo.currencyCode === '')){
                            setTransferInfo({
                                ...transferInfo,
                                currencyCode: 4
                            })
                            setBtnAvailable(true)
                        }
                    }
                } else {
                    setBtnAvailable(false)
                }
            }
        }
    }, [transferInfo])

    const inputChange = (e)=>{
        setTransferInfo({
            ...transferInfo,
            [e.target.name]: e.target.value
        })
    }
    //<p className={`${block}__destiny-user`}>{ownerDestiny}</p> //line 129 entre 2 forms
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
                            <select className={`${block}__form__input--select`} name='senderAccount' id='originAccN' onChange={inputChange} value={transferInfo.senderAccount}>
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
                        <h2>Destiny</h2>
                        { typeLF ? <>
                            { typeLF === 'foreign' ? 
                                <>
                                    <form className={`${block}__form__input-container`}>
                                        <label className={`${block}__form__label`} htmlFor='destinyAccN'>Account number: </label>
                                        <input className={`${block}__form__input`} id='destinyAccN' type='text' required name='receiverAccount' onChange={inputChange}/>
                                        <label className={show ? `${block}__form__error` : `${block}__form__error ${block}__form__error--hide`}>Wrong information, please verify</label>
                                    </form>
                                    
                                    <form className={`${block}__form__input-container`}>
                                        <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                        <input className={`${block}__form__input`} id='destinyAmount' name='amount' required onChange={inputChange} type='number'/>
                                    </form>
                                    <div className={`${block}__btn-container`}>
                                        <button className={`${block}__back-btn`} onClick={()=>{
                                            setTypeLF(false)
                                            resetTransferInfo()
                                        }}>Back</button>
                                        <button className={btnAvailable ? `${block}__btn-pay` : `${block}__btn-pay ${block}__btn-pay--disabled`} onClick={transferAction}>Transfer</button>
                                    </div> 
                                </> : 
                                <>
                                    {subtype ? <>
                                        {subtype === 'sender' ? <>
                                            <form className={`${block}__form__input-container`}>
                                                <label className={`${block}__form__label`} htmlFor='destinyAccN'>Account number: </label>
                                                <input className={`${block}__form__input`} id='destinyAccN' type='text' required name='receiverAccount' onChange={inputChange}/>
                                                <label className={show ? `${block}__form__error` : `${block}__form__error ${block}__form__error--hide`}>Wrong information, please verify</label>
                                            </form>
                                            <form className={`${block}__form__input-container`}>
                                                <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                                <input className={`${block}__form__input`} id='destinyAmount' name='amount' required onChange={inputChange} type='number'/>
                                            </form>
                                            <div className={`${block}__btn-container`}>
                                                <button className={`${block}__back-btn`} onClick={()=>{
                                                    setSubtype(false)
                                                    resetTransferInfo()
                                                }}>Back</button>
                                                <button className={btnAvailable ? `${block}__btn-pay` : `${block}__btn-pay ${block}__btn-pay--disabled`} onClick={transferAction}>Transfer</button>
                                            </div> 
                                        </> : <>
                                            <form className={`${block}__form__input-container`}>
                                                <label htmlFor='originAccN' className={`${block}__form__label`}>Destiny account: </label>
                                                <select className={`${block}__form__input--select`} name='receiverAccount' id='originAccN' onChange={inputChange}>
                                                    <option value=''>Choose an account</option>
                                                    {
                                                        accountsData.map((x, i)=>{
                                                            let currency
                                                            currenciesData.forEach((y) => {
                                                                if(x.currencyCode === y.idCurrency){
                                                                    currency = y
                                                                }
                                                            })
                                                            if(transferInfo.senderAccount !== x.accountNumber){
                                                                return(
                                                                    <option 
                                                                    value={x.accountNumber}
                                                                    key={i}>{currency.prefix}{x.accountNumber}</option>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </form>

                                            <form className={`${block}__form__input-container`}>
                                                <label className={`${block}__form__label`} htmlFor='destinyAmount'>Amount: </label>
                                                <input className={`${block}__form__input`} id='destinyAmount' name='amount' required onChange={inputChange} type='number'/>
                                            </form>
                                            <div className={`${block}__btn-container`}>
                                                <button className={`${block}__back-btn`} onClick={()=>{
                                                    setSubtype(false)
                                                    resetTransferInfo()
                                                }}>Back</button>
                                                <button className={btnAvailable ? `${block}__btn-pay` : `${block}__btn-pay ${block}__btn-pay--disabled`} onClick={transferAction}>Transfer</button>
                                            </div> 
                                        </>}
                                    </> : <>
                                        <div className={`${block}__select ${block}__select--special`}>
                                            <button className={`${block}__select__btn`} onClick={()=>setSubtype('senderReceiver')}>My accounts</button>
                                            <button className={`${block}__select__btn`} onClick={()=>setSubtype('sender')}>Third party accounts</button>
                                        </div>
                                        <div className={`${block}__btn-container--center`}>
                                            <button className={`${block}__back-btn`} onClick={()=>setTypeLF(false)}>Back</button>
                                        </div>
                                    </>}
                                </>
                            }
                            </> : <>
                            <div className={`${block}__select`}>
                                <button className={`${block}__select__btn`} onClick={()=>setTypeLF('foreign')}>External accounts</button>
                                <button className={`${block}__select__btn`} onClick={()=>setTypeLF('local')}>Alchemy accounts</button>
                            </div>
                        </>}
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

export default Transfer