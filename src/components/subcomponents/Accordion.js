import { useState } from 'react'
import '../../styles/components/subcomponents/Accordion.scss'

function Accordion(){
    const block = 'accordion'
    const featuresList = [{
        name:'Profile', 
        description: 'See your personal information, and related info',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484125/profile_n3b75g.png'
    }, {
        name: 'Add money',
        description: 'In this page you can insert money to your accounts',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484071/addmoney_ngyk1j.png'
    }, {
        name: 'Transfer',
        description: 'This page allows you to transfer your money to other accounts',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484151/transfer_xrwxt0.png'
    }, {
        name: 'Services',
        description: 'This option gives the ultimate way to pay your basic services',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484137/services_px0jmf.png'
    }, {
        name: 'Account history',
        description: 'We always store your money`s movements, so you have them visible here',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484109/history_gn7439.png'
    }]
    const [hover, setHover] = useState(0)

    return(
        <section className={`${block}__root`}>
            {featuresList.map((x, i)=>{
                return(
                    <div className={`${block}__item`} key={i}>
                        <a href='' className={`${block}__item__title`} onMouseOver={()=>setHover(`${x.name}`)}>
                            <div className={`${block}__item__container`}>
                                <img src={x.image} alt={`Icon to ${x.name}`} className={`${block}__item__image`}/>
                                <h2>{x.name}</h2>
                            </div>
                        
                        <div className={hover === x.name ? `${block}__item__description ${block}__item__description--show` : `${block}__item__description`}>
                            <p>{x.description}</p>
                        </div>
                        </a>
                    </div>
                    
                )
            })}
        </section>
    )
}

export default Accordion