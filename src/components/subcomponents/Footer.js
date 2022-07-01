import '../../styles/components/subcomponents/Footer.scss'
import logo from '../../assets/logoname.png'
import waterIcon from '../../assets/waterWhite.png'
import electricityIcon from '../../assets/electricityWhite.png'
import taxesIcon from '../../assets/taxesWhite.png'
import cellWhite from '../../assets/cellphoneWhite.png'

function Footer(){
    const block = 'footer'

    return(
        <footer>
            <div className={`${block}__section--upper`}>
                <div className={`${block}__section--upper__division-contact`}>
                    <div className={`${block}__section--upper__logo`}>
                        <img src={logo} alt='bank logo'/>
                    </div>
                    <div className={`${block}__section--upper__links`}>
                        <a href="https://cr.linkedin.com/in/iv%C3%A1n-cort%C3%A9s-90487218a?trk=people-guest_people_search-card"
                        target="_blank">
                            <img src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656541729/linkedinLogoWhite_ro5sgt.png' alt='linkedin link' className={`${block}__icon-contact`}/>
                        </a>
                        <a href="mailto: cortes.ivan353@gmail.com">
                            <img src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656541725/emailWhite_y26zgv.png' alt='email link' className={`${block}__icon-contact`}/>
                        </a>
                        <a href="tel:+50672768391">
                            <img src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656541718/whatsappLogoWhite_evhdau.png' alt='whatsapp link' className={`${block}__icon-contact`}/>
                        </a>
                    </div>
                </div>
                <div className={`${block}__section--upper__division`}>
                    <h2>About us</h2>
                    <p className={`${block}__section--upper__text`}>This platform is made to act like a banking entity, it supports 
                        users and accounts. You can insert fake money and transact that money with other users,
                        among other features performed. This is the third project made during
                        the Immersive Program at Konrad Group. </p>
                </div>
                <div className={`${block}__section--upper__division`}>
                    <h2>Services</h2>
                    <ul className={`${block}__section--upper__services`}>
                        <li className={`${block}__section--upper__service-container`}>
                            <img src={electricityIcon} alt='electricity service image'/>
                            <p className={`${block}__section--upper__service`}>Electricity</p>
                        </li>
                        <li className={`${block}__section--upper__service-container`}>
                            <img src={waterIcon} alt='water service image'/>
                            <p className={`${block}__section--upper__service`}>Water</p>
                        </li>
                        <li className={`${block}__section--upper__service-container`}>
                            <img src={taxesIcon} alt='taxes service image'/>
                            <p className={`${block}__section--upper__service`}>Taxes</p>
                        </li>
                        <li className={`${block}__section--upper__service-container`}>
                            <img src={cellWhite} alt='cellphone service image'/>
                            <p className={`${block}__section--upper__service`}>Cellphone</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${block}__section--lower`}>
                <p>Alchemy Bank © Ivan Cortes 2022 All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer