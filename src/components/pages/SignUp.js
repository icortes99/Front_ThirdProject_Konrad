import { useEffect, useState } from 'react'
import '../../styles/components/pages/SignUp.scss'
import Navbar from '../subcomponents/Navbar'
import Footer from '../subcomponents/Footer'
import InfoModal from '../subcomponents/InfoModal'

function SignUp(){
    const [userObject, setUserObject] = useState({
        idUser: '',
        email: '',
        name: '',
        lastname: '',
        password: '',
        incomeSource: '',
        photo: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656432805/unknown_tic5vv.jpg'
    })
    const block = 'signup'
    const [currentTab, setCurrentTab] = useState(0)
    const [loadImg, setLoadImg] = useState(false)
    const [everythingGood, setEverythingGood] = useState(false)
    const [modal, setModal] = useState(false)

    function handleChange(e){
        //e.preventDefault()
        const value = e.target.value
        if(e.target.name !== 'confirmpassword'){
            setUserObject({
                ...userObject,
                [e.target.name]: value
            })
        }
    }

    const changeTab = (e, x)=>{
        e.preventDefault()
        let approved = true

        //validation

        if(approved && (x !== 0)){
            if(currentTab !== 2 && x > 0){
                setCurrentTab(currentTab + x)
            } else {
                //setCurrentTab(currentTab + x)
                //console.log('obj: ' + JSON.stringify(userObject))
                fetch('https://api-third-project.herokuapp.com/users/signup',{
                    method: 'POST',
                    body: JSON.stringify(userObject),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }).then(response => response.json())
                .then(data => setEverythingGood(data))
                .catch(err => setEverythingGood(null))
            }
        }
    }

    const UpdateImg = (e)=>{
        setLoadImg(true)

        console.log(e.target.files[0])
        const imgData = new FormData()
        imgData.append('file', e.target.files[0])
        imgData.append('upload_preset', 'unsigned')

        fetch('https://api.cloudinary.com/v1_1/dhe2iy0sa/image/upload', {
            method: 'POST',
            body: imgData
        }).then(response=>response.json())
        .then(res=>{setUserObject({
                ...userObject,
                photo: res.secure_url
            })
            setLoadImg(false)
        })
        .catch(err=>console.log('Error: ' + err))
    }

    useEffect(()=>{
        if(everythingGood){
            setModal(true)
            setUserObject({
                idUser: '',
                email: '',
                name: '',
                lastname: '',
                password: '',
                incomeSource: '',
                photo: 'https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656432805/unknown_tic5vv.jpg'
            })
            setTimeout(()=>{window.location.href = '/login'}, 4000)
        }
    }, [everythingGood])

    return(
        <>
            <Navbar
            page={3}/>
            <main>
                <div className={`${block}__root`}>
                    <div className={`${block}__signup`}>
                        <div className={`${block}__signup__title-container`}>
                            <h1>Sign up</h1>
                            <p>We need more information to create a new user, 
                            you can ask to our <a href='https://www.forbes.com/advisor/banking/how-to-protect-your-online-banking-information/' target='_blank'>Help center</a></p>
                        </div>

                        <div className={`${block}__signup__steps-container`}>
                            <div className={currentTab === 0 ? `${block}__step__container ${block}__step__container--focus` : `${block}__step__container`}>
                                <p>1</p>
                            </div>
                            <div className={currentTab === 1 ? `${block}__step__container ${block}__step__container--focus` : `${block}__step__container`}>
                                <p>2</p>
                            </div>
                            <div className={currentTab === 2 ? `${block}__step__container ${block}__step__container--focus` : `${block}__step__container`}>
                                <p>3</p>
                            </div>
                        </div>

                        <form onSubmit={(e)=>changeTab(e, 1)} action='POST' className={currentTab === 0 ? `${block}__signup-tab ${block}__signup-tab--show` : `${block}__signup-tab`}>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='inEmail' className={`${block}__input-container__label`}>Email</label>
                                <input id='inEmail' type='text' name='email' onChange={handleChange} pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' required className={`${block}__input-container__input`}/>
                            </div>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='inPassword' className={`${block}__input-container__label`}>Password</label>
                                <input id='inPassword' type='password' name='password' onChange={handleChange} required className={`${block}__input-container__input`}/>
                            </div>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='in2ndPassword' className={`${block}__input-container__label`}>Confirm password</label>
                                <input id='in2ndPassword' type='password' name='confirmpassword' onChange={handleChange} required className={`${block}__input-container__input`}/>
                            </div>
                            <button className={`${block}__button`}>Next</button>
                        </form>


                        <form onSubmit={(e)=>changeTab(e, 1)} action='POST' className={currentTab === 1 ? `${block}__signup-tab ${block}__signup-tab--show` : `${block}__signup-tab`}>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='inID' className={`${block}__input-container__label`}>ID</label>
                                <input id='inID' type='text' name='idUser' onChange={handleChange} minLength={8} maxLength={8} required className={`${block}__input-container__input`}/>
                            </div>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='inName' className={`${block}__input-container__label`}>Name</label>
                                <input id='inName' type='text' name='name' onChange={handleChange} required className={`${block}__input-container__input`}/>
                            </div>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='inLastName' className={`${block}__input-container__label`}>Last name</label>
                                <input id='inLastName' type='text' name='lastname' onChange={handleChange} required className={`${block}__input-container__input`}/>
                            </div>
                            
                            <div className={`${block}__button-container`}>
                                <button onClick={()=>setCurrentTab(0)} className={`${block}__button`}>Previous</button>
                                <button className={`${block}__button`}>Next</button>
                            </div>
                        </form>


                        <form onSubmit={(e)=>changeTab(e, 1)} action='POST' className={currentTab === 2 ? `${block}__signup-tab ${block}__signup-tab--show` : `${block}__signup-tab`}>
                            <div className={`${block}__profile__container`}>
                                <div className={`${block}__profile__image-container`}>
                                    <img className={loadImg ? `${block}__profile__photo ${block}__profile__photo--loading`: `${block}__profile__photo`} src={userObject.photo} alt='profile image'/>
                                </div>
                                <label className={`${block}__label-hidden`} htmlFor='inImage'>Add profile image</label>
                                <input id='inImage' className={`${block}__profile__button`} type='file' onChange={(e)=>{UpdateImg(e)}}/>
                            </div>
                            <div className={`${block}__input-container`}>
                                <label htmlFor='inIS' className={`${block}__input-container__label`}>Income source: </label>
                                <select name='incomeSource' id='inIS' onChange={handleChange}>
                                    <option value='Employed'>Employed / Salaried</option>
                                    <option value='Business Owner'>Business Owner</option>
                                    <option value='Self-Employed'>Self-Employed</option>
                                    <option value='Retired'>Retired</option>
                                    <option value='Investor'>Investor</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>

                            <div className={`${block}__button-container`}>
                                <button onClick={()=>setCurrentTab(0)} className={`${block}__button`}>Previous</button>
                                <button type='submit' className={`${block}__button`}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                { modal &&
                <InfoModal
                visible={modal}
                setVisible={setModal}
                toggle={everythingGood ? 1 : 0}
                msg={everythingGood ? 'Sign up completed' : 'Something went wrong'}
                time={3000}/>}
            </main>
            <Footer/>
        </>
    )
}

export default SignUp