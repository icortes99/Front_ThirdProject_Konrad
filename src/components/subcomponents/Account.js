import '../../styles/components/subcomponents/Account.scss'

function Account(props){
    const {account, currency} = props
    const block = 'accountCard'

    return(
        <div className={`${block}__container`}>
            <div className={`${block}__container--logo`}>
                <img src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656529780/account_yodfy7.png' alt='account icon' width='30rem'/>
            </div>
            <div className={`${block}__container--info`}>
                <div className={`${block}__container__title-container`}>
                    <h3 className={`${block}__container__title`}>{currency.prefix}{account.accountNumber}</h3>
                </div>
                <div className={`${block}__container__description`}>
                    <p className={`${block}__container__balance`}>{currency.symbol}{account.accountBalance}</p>
                    <p className={`${block}__container__currency`}>{currency.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Account