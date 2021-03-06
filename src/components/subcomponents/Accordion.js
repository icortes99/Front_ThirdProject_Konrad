import { useState } from 'react'
import '../../styles/components/subcomponents/Accordion.scss'

function Accordion(){
    const block = 'accordion'
    const [visible, setVisivle] = useState(false)
    const featuresList = [{
        page: '/profile',
        name:'Profile', 
        description: 'See your personal information, and related info',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484125/profile_n3b75g.png'
    }, {
        page: '/addmoney',
        name: 'Add money',
        description: 'In this page you can insert money to your accounts',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484071/addmoney_ngyk1j.png'
    }, {
        page: '/transfer',
        name: 'Transfer',
        description: 'This page allows you to transfer your money to other accounts',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484151/transfer_xrwxt0.png'
    }, {
        page: '/services',
        name: 'Services',
        description: 'This option gives the ultimate way to pay your basic services',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484137/services_px0jmf.png'
    }, {
        page: '/history',
        name: 'Account history',
        description: 'We always store your money`s movements, so you have them visible here',
        image: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484109/history_gn7439.png'
    }]
    const [hover, setHover] = useState(0)

    return(
        <>
            <input type='checkbox' id='visible'></input>
            <label htmlFor='visible'>
                <i className='fas fa-bars' id='btn'></i>
                <i className='fas fa-times' id='cancel'></i>
            </label>
            <section className={`${block}__root`}>
                <div className={`${block}__accordion`}>
                    <div className={`${block}__title__container`}>
                        <h1 className={`${block}__title__title`}>My app</h1>
                    </div>
                    {featuresList.map((x, i)=>{
                        return(
                            <div className={`${block}__item`} key={i}>
                                <a href={x.page} className={`${block}__item__title`} onMouseOver={()=>setHover(`${x.name}`)}>
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
                </div>
            </section>
        </>
    )
}

export default Accordion