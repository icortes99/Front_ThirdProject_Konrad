import { useState } from 'react'
import '../../styles/components/pages/Profile.scss'
import editIcon from '../../assets/edit.png'

function Profile(){
    const block = 'profile'
    const hardCodedUser = {
        "idUser": 58897643,
        "password": "$2b$10$3WpRf5bT6tttCHNUzKUfIutGqx54VBiPHnSNbPXY/J16lPfhJzy.y",
        "email": "pepe@contactus.com",
        "name": "Paquita",
        "lastname": "Del Barrio",
        "photo": "https://res.cloudinary.com/dhe2iy0sa/image/upload/v1656432805/unknown_tic5vv.jpg",
        "incomeSource": "Self-Employed",
        "iat": 1656686849,
        "exp": 1656773249
    }
    const [mode, setMode] = useState(0)
    const userLoggedIn = sessionStorage.getItem('token')

    const submitForm = (e)=>{
        e.preventDefault()
        setMode(0)
    }

    return(
        <>
            { userLoggedIn !== null ? <>
                <div>
                    <section className={`${block}__image-section`}>
                        <img src={hardCodedUser.photo} alt='profile image' className={`${block}__image-section__img`}/>
                        <button onClick={()=>setMode(1)} className={`${block}__image-section__edit-btn`}>
                            <img src={editIcon} alt='edit icon' className={`${block}__image-section__edit`}/>
                        </button>
                    </section>
                    <section className={`${block}__description-section`}>
                        <ul className={mode === 0 ? `${block}__show` : `${block}__show--hidden`}>
                            <li><p>Name: {hardCodedUser.name}</p></li>
                            <li><p>Last name: {hardCodedUser.lastname}</p></li>
                            <li><p>ID: {hardCodedUser.idUser}</p></li>
                            <li><p>Email: {hardCodedUser.email}</p></li>
                            <li><p>Source of income: {hardCodedUser.incomeSource}</p></li>
                        </ul>
                        <form method='PUT' className={mode === 1 ? `${block}__edit` : `${block}__edit--hidden`} onSubmit={submitForm}>
                            <div>
                                <label htmlFor='inName'>Name: </label>
                                <input id='inName' name='name' defaultValue={hardCodedUser.name}/>
                            </div>
                            <div>
                                <label htmlFor='inLastName'>Last name: </label>
                                <input id='inLastName' name='lastname' defaultValue={hardCodedUser.lastname}/>
                            </div>
                            <div>
                                <p>ID: {hardCodedUser.idUser}</p>
                            </div>
                            <div>
                                <label htmlFor='inEmail'>Email: </label>
                                <input id='inEmail' name='email' defaultValue={hardCodedUser.email}/>
                            </div>
                            <div className={`${block}`}>
                                <label htmlFor='inIS' className={`${block}`}>Select your income source: </label>
                                <select name='incomeSource' id='inIS'>
                                    <option value='Employed'>Employed / Salaried</option>
                                    <option value='Business Owner'>Business Owner</option>
                                    <option value='Self-Employed'>Self-Employed</option>
                                    <option value='Retired'>Retired</option>
                                    <option value='Investor'>Investor</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                            <button>Submit</button>
                        </form>
                    </section>
                </div>
            </> : <h1>You have not access to this page</h1>}
        </>
    )
}

export default Profile