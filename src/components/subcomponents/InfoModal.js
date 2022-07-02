import { useEffect } from 'react'
import errorIcon from '../../assets/error.png'
import successIcon from '../../assets/success.png'
import '../../styles/components/subcomponents/InfoModal.scss'

function InfoModal(props){
    const {visible=true, setVisible, toggle=1, msg, time} = props
    const block = 'infoModal'

    useEffect(()=>{
        if(visible){
            setTimeout(()=>{
                setVisible(false)
            }, time)
        }
    }, [visible])

    return(
        <div className={visible ? (toggle === 0 ? `${block}__root ${block}__root--error` : `${block}__root ${block}__root--success`) : 
        (toggle === 0 ? `${block}__root ${block}__root--hidden ${block}__root--error` : `${block}__root ${block}__root--hidden ${block}__root--success`)}>
            <div className={`${block}__icon-container`}>
                { toggle === 0 ?
                    <img src={errorIcon} alt='error icon' className={`${block}__icon-container__icon`}/> :
                    <img src={successIcon} alt='success icon' className={`${block}__icon-container__icon`}/>
                }
            </div>
            <div className={`${block}__text-container`}>
                <p className={`${block}__text-container__text`}>{msg ? msg : 'Default message'}</ p>
            </div>
        </div>
    )
}
export default InfoModal