import '../../styles/components/subcomponents/Card.scss'

function Card(props){
    const {obj} = props
    const block = 'card1'

    return(
    <div className={`${block}__root`}>
        <div className={`${block}__card`}>
            <div className={`${block}__card__primarily`}>
                <img src={obj.img} className={`${block}__card__image`}/>
                <h2 className={`${block}__card__title`}>{obj.title}</h2>
            </div>
            <div className={`${block}__card__secondary`}>
                <p className={`${block}__card__description`}>{obj.description}</p>
                <button onClick={()=>window.location.href = 'http://localhost:3000/login'} className={`${block}__card__button`}>Get</button>
            </div>
        </div>
    </div>)
}

export default Card