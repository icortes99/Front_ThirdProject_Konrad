import { useState } from 'react'
import Navbar from '../subcomponents/Navbar'
import logo from '../../assets/logo.png'
import loginLogo from '../../assets/login.png'
import '../../styles/components/pages/LogIn.scss'
import Footer from '../subcomponents/Footer'

function LogIn(){
    const block = 'login'
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    function handleChange(e){
        const value = e.target.value
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: value
        })
    }

    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                <div className={`${block}__body`}>
                    <div className={`${block}__login-container`}>
                        <img src={loginLogo} className={`${block}__login-container__image`} alt='login icon'/>
                        <h1 className={`${block}__login-container__title`}>Log in</h1>
                        <form className={`${block}__form`}>
                            <input type='text' name='username' onChange={handleChange} placeholder='Username' className={`${block}__form__input`} required pattern='[0-9]'/>
                            <input type='password' name='password' onChange={handleChange} placeholder='Password' className={`${block}__form__input`} required/>
                            <button type='submit' className={`${block}__form__button`}>Log in</button>
                        </form>
                    </div>
                    <div className={`${block}__signup-container--shadow`}>
                        <div className={`${block}__signup-container--shape`}>
                            <div className={`${block}__signup-container`}>
                                <p className={`${block}__signup-container__text`}>Not have an account yet?</p>
                                <a className={`${block}__signup-container__link`} href='/signup'>Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default LogIn