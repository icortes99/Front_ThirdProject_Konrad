import '../../styles/components/pages/Dashboard.scss'
import Accordion from '../subcomponents/Accordion'
import Account from '../subcomponents/Account'

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

    return(
        <div className={`${block}__root`}>
            <Accordion/>
            <div className={`${block}__viewport`}>
                <div className={`${block}__viewport__profile-container`}>
                    Profile
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
        </div>
    )
}

export default Dashboard