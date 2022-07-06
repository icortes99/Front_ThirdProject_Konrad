import { useContext, useEffect, useState } from 'react'
import Accordion from '../subcomponents/Accordion'
import Account from '../subcomponents/Account'
import Footer from '../subcomponents/Footer'
import Navbar from '../subcomponents/Navbar'
import '../../styles/components/pages/Dashboard.scss'

function Dashboard(){
    const block = 'dashboard'
    const sessionData = JSON.parse(sessionStorage.getItem('data'))
    let userLoggedIn = sessionData[0].token
    const accountsData = sessionData[0].accounts
    let currenciesData = sessionData[1]

    return(
        <>
        {userLoggedIn !== null ?
            <> 
            <Navbar
            page={4}/>
            <main className={`${block}__root`}>
                <Accordion/>
                <div className={`${block}__viewport`}>
                    <div className={`${block}__viewport__profile`}>
                        <p>My account: {sessionData[0].name}{` `}{sessionData[0].lastname}</p>
                    </div>
                    <div className={`${block}__viewport__accounts-container`}>
                        {
                            accountsData.map((x, i)=>{
                                let actualCurrency
                                currenciesData.forEach((y)=>{
                                    if(x.currencyCode === y.idCurrency){
                                        actualCurrency = y
                                    }
                                })
                                return(
                                    <Account
                                    account={x}
                                    currency={actualCurrency}
                                    key={i}/>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
            <Footer/></>
            : <h1>You have not access to this page</h1> }
        </>
    )
}

export default Dashboard