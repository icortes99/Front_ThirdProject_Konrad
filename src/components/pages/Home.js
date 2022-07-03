import Footer from '../subcomponents/Footer'
import imageCard1 from '../../assets/creditcard1.png'
import imageCard2 from '../../assets/creditcard2.png'
import imageCard3 from '../../assets/creditcard3.png'
import Card from '../subcomponents/Card'
import Navbar from '../subcomponents/Navbar'
import founder from '../../assets/founder.jpg'
import bank from '../../assets/backgrounds/background5.jpg'
import '../../styles/components/pages/Home.scss'

function Home(){
    const block = 'home'
    const cardList = [{
        img: imageCard2,
        title: 'Investor card',
        subtitle: 'Blue card',
        description: 'It acts as a physic wallet. You can invest on the S&P 500, NASDAQ among others.'
    },{
        img: imageCard1,
        title: 'Credit card',
        subtitle: 'Red card',
        description: 'Buy now, pay later. You choose the lifetime and how to pay it.'
    },{
        img: imageCard3,
        title: 'Platinum card',
        subtitle: 'Red card',
        description: 'The ultimate way to buy properties, yachts or anything above $1.000.000.'
    }]

    return(
        <>
            <Navbar
            page={1}/>
            <main>
                <div className={`${block}__hero`}>
                    <div className={`${block}__hero__title-container`}>
                        <h2 className={`${block}__hero__title-container__title`}>Ready to move forward?</h2>
                        <div className={`${block}__hero__title-container__buttons`}>
                            <a href='/login'>Log in</a>
                            <a href='/signup'>Sign up</a>
                        </div>
                    </div>
                </div>
                <div className={`${block}__main`} id='services'>
                    <h1 >Welcome to Alchemy Personal Banking</h1>
                    <h2 >Explore Alchemy Trust and related products and services</h2>
                </div>
                <div className={`${block}__services`}>
                    <div className={`${block}__services__container`}>
                        <img className={`${block}__services__image`} alt='add money image' src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484071/addmoney_ngyk1j.png'/>
                        <div className={`${block}__services__desc-container`}>
                            <h3 className={`${block}__services__title`}>Add money</h3>
                            <p className={`${block}__services__description`}>For daily needs, you can insert money to any of your accounts</p>
                        </div>
                    </div>
                    <div className={`${block}__services__container`}>
                        <img className={`${block}__services__image`} alt='transfer image' src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484151/transfer_xrwxt0.png'/>
                        <div className={`${block}__services__desc-container`}>
                            <h3 className={`${block}__services__title`}>Transfer money</h3>
                            <p className={`${block}__services__description`}>Among same bank accounts you can transfer money and verify if everything was good</p>
                        </div>
                    </div>
                    <div className={`${block}__services__container`}>
                        <img className={`${block}__services__image`} alt='services image' src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484137/services_px0jmf.png'/>
                        <div className={`${block}__services__desc-container`}>
                            <h3 className={`${block}__services__title`}>Pay services</h3>
                            <p className={`${block}__services__description`}>Find your needs in here. Pay your bills from your cellphone, wherever you are at</p>
                        </div>
                    </div>
                    <div className={`${block}__services__container`} id='products'>
                        <img className={`${block}__services__image`} alt='history image' src='https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656484109/history_gn7439.png'/>
                        <div className={`${block}__services__desc-container`}>
                            <h3 className={`${block}__services__title`}>Review your movements</h3>
                            <p className={`${block}__services__description`}>We want you to trust us, here you have your movement's details. Whenever you need them</p>
                        </div>
                    </div>
                </div>
                <div className={`${block}__cards`}>
                    <h2>Want to get some money?</h2>
                    <div className={`${block}__cards__container`}>
                        {cardList.map((x, i)=>{
                            return(
                                <Card
                                obj={x}
                                key={i}/>
                            )
                        })}
                    </div>
                    <div className={`${block}__cards__circle1`}></div>
                    <div className={`${block}__cards__circle2`}></div>
                    <div className={`${block}__cards__circle3`} id='history'></div>
                </div>
                <div className={`${block}__info`}>
                    <h2>History</h2>
                    <div className={`${block}__info__container`}>
                        <img className={`${block}__info__img-founder`} alt='founder image' src={founder}/>
                        <h3>About the founder</h3>
                        <p>The Alchemy Bank's founder is an influential thinker of this century. He wanted to
                            give security and real financial advises to his people. This bank is managed by the
                            philosophy of "Help people first, then do money". That's why you will find in here
                            transactions without commissions, you con add money to your accounts in a limitless way
                            among other possibilities.
                        </p>
                    </div>
                    <div className={`${block}__info__container`}>
                        <img className={`${block}__info__img-bank`} alt='founder image' src={bank}/>
                        <h3>About the bank</h3>
                        <p>Created in 1936, and with a track record of 86 years we manage money as safe as possible.
                            We follow the most strict international rules and make sure that our investments are on the top
                            invest indexes. We have special treat from WallStreet due to our fame and status. Your money cannot
                            be safer.
                        </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Home