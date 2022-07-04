import { useContext, useState } from 'react'
import Navbar from '../subcomponents/Navbar'
import InfoModal from '../subcomponents/InfoModal'
import logo from '../../assets/logo.png'
import loginLogo from '../../assets/login.png'
import '../../styles/components/pages/LogIn.scss'
import Footer from '../subcomponents/Footer'
import UserContext from '../subcomponents/UserContext'

function LogIn(){
    //const userContext = useContext(UserContext)
    const block = 'login'
    const [loginInfo, setLoginInfo] = useState({
        idUser: '',
        password: ''
    })
    const [modalVisible, setModalVisible] = useState(false)

    function handleChange(e){
        const value = e.target.value
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: value
        })
    }

    const loginAction = (e)=>{
        e.preventDefault()
        //console.log('context: ' + JSON.stringify(loginInfo))
        fetch('https://api-third-project.herokuapp.com/users/login', {
            method: 'POST',
            body: JSON.stringify(loginInfo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data !== 'User does not exist' && data !== 'Wrong password'){
               window.location.href = '/dashboard'
            } else {
                setModalVisible(true)
            }
        })
        .catch(err => setModalVisible(true))

        console.log('all good')
    }

    return(
        <div>
            <header>
                <Navbar
                page={2}/>
            </header>
            <main>
                <div className={`${block}__body`}>
                    <div className={`${block}__login-container`}>
                        <img src={loginLogo} className={`${block}__login-container__image`} alt='login icon'/>
                        <h1 className={`${block}__login-container__title`}>Log in</h1>
                        <form className={`${block}__form`}>
                            <input type='text' name='idUser' onChange={handleChange} placeholder='Username' className={`${block}__form__input`} required/>
                            <input type='password' name='password' onChange={handleChange} placeholder='Password' className={`${block}__form__input`} required/>
                            <button onClick={loginAction} type='submit' className={`${block}__form__button`}>Log in</button>
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
            <InfoModal
            visible={modalVisible}
            setVisible={setModalVisible}
            toggle={0}
            msg='Wrong information, please try again'
            time={3000}/>
            <Footer/>
        </div>
    )
}

export default LogIn