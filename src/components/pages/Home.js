import Footer from '../subcomponents/Footer'
import imageCard1 from '../../assets/creditcard1.png'
import Card from '../subcomponents/Card'
import logo from '../../assets/logoname.png'
import '../../styles/components/pages/Home.scss'
import Navbar from '../subcomponents/Navbar'

function Home(){
    const block = 'home'
    const cardList = [{
        img: imageCard1,
        title: 'Investor card',
        subtitle: 'Blue card',
        description: 'It acts as a physic wallet. You can invest on the S&P 500, NASDAQ among others.'
    },{
        img: imageCard1,
        title: 'Credit card',
        subtitle: 'Red card',
        description: 'Buy now, pay later. You choose the lifetime and how to pay it.'
    },{
        img: imageCard1,
        title: 'Platinum card',
        subtitle: 'Red card',
        description: 'The ultimate way to buy properties, yachts or anything above $1.000.000.'
    }]

    return(
        <>
            <Navbar/>
            <div className={`${block}__hero`}>
                <div className={`${block}__hero__logo-container`}>
                    <img className={`${block}__hero__logo`} src={logo} alt='logo'/>
                </div>
            </div>
            <div className={`${block}__cards`}>
                <h2>What do I want to do today</h2>
                {cardList.map((x, i)=>{
                    return(
                        <Card
                        obj={x}
                        key={i}/>
                    )
                })}
            </div>
            <Footer/>
        </>
    )
}

export default Home