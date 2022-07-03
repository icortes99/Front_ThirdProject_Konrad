import { useState } from 'react'
import logo from '../../assets/logoname.png'
import arrow from '../../assets/dropdown.png'
import '../../styles/components/subcomponents/Navbar.scss'

function Navbar(props){
    const block = 'navbar'
    const {page = 0} = props //int value
    const [dropView, setDropView] = useState(false)
    return(
        <nav className={`${block}__root`}>
            <a className={`${block}__logo-container`} href='/'>
                <img className={`${block}__logo-container__logo`}  src={logo} alt='logo'/>
            </a>
            <div className={page === 1 ? `${block}__dropdown-container` : `${block}__dropdown-container--hide`}>
                <button onClick={()=>{setDropView(!dropView)}} className={`${block}__dropdown-container__button`}>Navigate <span className={dropView ? `${block}__dropdown-container__span ${block}__dropdown-container__span--displayed` : `${block}__dropdown-container__span`}><img src={arrow} alt='arrow' width='15rem'/></span></button>
                <ul className={dropView ? `${block}__dropdown-container__content` : `${block}__dropdown-container__content ${block}__dropdown-container__content--hide`}>
                    <li className={`${block}__dropdown-container__li`}><a href='/#services'>Our services</a></li>
                    <li className={`${block}__dropdown-container__li`}><a href='/#products'>Products</a></li>
                    <li className={`${block}__dropdown-container__li`}><a href='/#history'>History</a></li>
                </ul>
            </div>

            <div className={ page === 1 ? `${block}__home-buttons` : `${block}__home-buttons--hide`}>
                <a className={`${block}__home-buttons__link`} href='/login'>Log in</a>
                <a className={`${block}__home-buttons__link`} href='/signup'>Sign up</a>
            </div>
        </nav>
    )
}

export default Navbar