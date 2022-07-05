import { useContext, useEffect, useState } from 'react'
import Accordion from '../subcomponents/Accordion'
import Account from '../subcomponents/Account'
import Footer from '../subcomponents/Footer'
import Navbar from '../subcomponents/Navbar'
import UserContext from '../subcomponents/UserContext'
import '../../styles/components/pages/Dashboard.scss'

function Dashboard(){
    const block = 'dashboard'
    const accountsHardCoded = [{
        accountNumber: 54276,
        currency: "Colon",
        accountBalance: 769000.44,
        userIdUser: 14783926
    }, {
        accountNumber: 324343,
        currency: "Dollar",
        accountBalance: 250.44,
        userIdUser: 14783926 
    }, {
        accountNumber: 33355,
        currency: "Dollar",
        accountBalance: 2500.44,
        userIdUser: 14783926
    }, {
        accountNumber: 5426543246786543222,
        currency: "Colon",
        accountBalance: 2500.44,
        userIdUser: 14783926
    }]
    const userLoggedIn = sessionStorage.getItem('data').token

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
                        <p>My account: {JSON.parse(sessionStorage.getItem('data')).name}</p>
                    </div>
                    <div className={`${block}__viewport__accounts-container`}>
                        {
                            accountsHardCoded.map((x, i)=>{
                                return(
                                    <Account
                                    account={x}
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