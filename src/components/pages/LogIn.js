import { useState } from 'react'
import '../../styles/components/pages/LogIn.scss'
import logo from '../../assets/logo.png'
import loginLogo from '../../assets/login.png'

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
        <>
            <div className={`${block}__nav`}>
                <a href='http://localhost:3000'>
                    <img src={logo} alt='logo' width='70rem' height='70rem'/>
                </a>
                <a href='http://localhost:3000/signup'>Sign up</a>
            </div>
            <div className={`${block}__body`}>
                <div className={`${block}__login-container`}>
                    <img src={loginLogo} className={`${block}__login-container__image`}/>
                    <form className={`${block}__form`}>
                        <input type='text' name='username' onChange={handleChange} placeholder='Username' className={`${block}__form__input`} required pattern='[0-9]'/>
                        <input type='password' name='password' onChange={handleChange} placeholder='Password' className={`${block}__form__input`} required/>
                        <button type='submit' className={`${block}__form__button`}>Log in</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogIn