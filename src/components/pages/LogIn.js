import { useContext, useState } from 'react'
import Navbar from '../subcomponents/Navbar'
import InfoModal from '../subcomponents/InfoModal'
import loginLogo from '../../assets/login.png'
import '../../styles/components/pages/LogIn.scss'
import Footer from '../subcomponents/Footer'

function LogIn(){
    const block = 'login'
    const [loginInfo, setLoginInfo] = useState({
        email: '',
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
    const [messageModal, setMessageModal] = useState('')

    const loginAction = async(e)=>{
        e.preventDefault()
        if(loginInfo.email !== '' && loginInfo.password !== ''){
            fetch('https://api-third-project.herokuapp.com/users/login', { //https://api-third-project.herokuapp.com
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(response => response.json())
            .then(async(data) => {
                if(data !== 'User does not exist' && data !== 'Wrong password'){
                    sessionStorage.setItem('data', JSON.stringify(data))
                    window.location.href = '/dashboard'
                } else {
                    setMessageModal('Wrong information, please try again')
                    setModalVisible(true)
                }
            })
            .catch(err => {
                setMessageModal('Wrong information, please try again')
                setModalVisible(true)
            })
        } else {
            setMessageModal('Please fill up all inputs before submit')
            setModalVisible(true)
        }
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
                            <input type='text' name='email' onChange={handleChange} placeholder='Username' className={`${block}__form__input`} required/>
                            <input type='password' name='password' onChange={handleChange} placeholder='Password' className={`${block}__form__input`} required/>
                            <button onClick={loginAction} type='submit' className={`${block}__form__button`}>Log in</button>
                        </form>
                        <p className={`${block}__signup-container__text`}>Not have an account yet?</p>
                        <a className={`${block}__signup-container__link`} href='/signup'>Sign up</a>
                    </div>
                </div>
            </main>
            { 
            <InfoModal
            visible={modalVisible}
            setVisible={setModalVisible}
            toggle={0}
            msg={messageModal}
            time={3000}/>}
            <Footer/>
        </div>
    )
}

export default LogIn