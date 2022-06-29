import { useState } from 'react'
import '../../styles/components/pages/SignUp.scss'

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

    function handleChange(e){
        e.preventDefault()
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
        let approved = false

        //validation

        if(approved && (x !== 0)){
            if(currentTab === 0){
                setCurrentTab(currentTab + x)
            } else {
                //redirect
            }
        }
    }

    return(
        <div className={`${block}__root`}>
            <div className={`${block}__signup`}>
                <div className={`${block}__signup__title-container`}>
                    <h1>Sign up</h1>
                    <p>We need more information to create a new user, 
                     you can ask to our <a href='' target='_blank'>Help center</a></p>
                </div>

                <div className={`${block}__signup__steps-container`}>
                    <div className={`${block}__step__container`}>
                        <h2 className={`${block}__step__title`}>Account information</h2>
                        <span className={`${block}__step__span`}></span>
                    </div>
                    <div className={`${block}__step__container`}>
                        <h2 className={`${block}__step__title`}>Personal information</h2>
                        <span className={`${block}__step__span`}></span>
                    </div>
                </div>

                <form onSubmit={(e)=>changeTab(e, 1)} action='POST' className={currentTab === 0 ? `${block}__signup-tab ${block}__signup-tab--show` : `${block}__signup-tab`}>
                    <div>
                        <label htmlFor='inEmail'>Email</label>
                        <input id='inEmail' type='text' name='email' onChange={handleChange} pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' required/>
                    </div>
                    <div>
                        <label htmlFor='inPassword'>Password</label>
                        <input id='inPassword' type='password' name='password' onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='in2ndPassword'>Confirm password</label>
                        <input id='in2ndPassword' type='password' name='confirmpassword' onChange={handleChange} required/>
                    </div>
                    <button className={`${block}__button`}>Next</button>
                </form>

                <form onSubmit={(e)=>changeTab(e, 1)} action='POST' className={currentTab === 1 ? `${block}__signup-tab ${block}__signup-tab--show` : `${block}__signup-tab`}>
                    <div>
                        <label htmlFor='inID'>ID</label>
                        <input id='inID' type='text' name='idUser' onChange={handleChange} pattern='[0-9]' required/>
                    </div>
                    <div>
                        <label htmlFor='inName'>Name</label>
                        <input id='inName' type='text' name='name' onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='inLastName'>Last name</label>
                        <input id='inLastName' type='text' name='lastname' onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor='inIS'>Select your income source: </label>
                        <select name='incomeSource' id='inIS'>
                            <option value='Employed'>Employed / Salaried</option>
                            <option value='Business Owner'>Business Owner</option>
                            <option value='Self-Employed'>Self-Employed</option>
                            <option value='Retired'>Retired</option>
                            <option value='Investor'>Investor</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                    <button className={`${block}__button`}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp