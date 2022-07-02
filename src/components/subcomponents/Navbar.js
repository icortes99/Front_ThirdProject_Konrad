import { useState } from 'react'
import logo from '../../assets/logoname.png'
import arrow from '../../assets/dropdown.png'
import '../../styles/components/subcomponents/Navbar.scss'

function Navbar(){
    const block = 'navbar'
    const [dropView, setDropView] = useState(false)
    return(
        <nav className={`${block}__root`}>
            <a className={`${block}__logo-container`} href='/'>
                <img className={`${block}__logo-container__logo`}  src={logo} alt='logo'/>
            </a>
            <div className={`${block}__dropdown-container`}>
                <button onClick={()=>{setDropView(!dropView)}} className={`${block}__dropdown-container__button`}>Navigate <span className={dropView ? `${block}__dropdown-container__span ${block}__dropdown-container__span--displayed` : `${block}__dropdown-container__span`}><img src={arrow} alt='arrow' width='15rem'/></span></button>
                <ul className={dropView ? `${block}__dropdown-container__content` : `${block}__dropdown-container__content ${block}__dropdown-container__content--hide`}>
                    <li className={`${block}__dropdown-container__li`}><a href=''>Credit cards</a></li>
                    <li className={`${block}__dropdown-container__li`}><a href=''>Services</a></li>
                    <li className={`${block}__dropdown-container__li`}><a href=''>Contact</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar