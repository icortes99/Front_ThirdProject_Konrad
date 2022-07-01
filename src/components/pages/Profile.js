import '../../styles/components/pages/Profile.scss'

function Profile(){
    const block = 'profile'

    return(
        <div>
            <section className={`${block}__image-section`}>
                <img src='' alt='profile image'/>
            </section>
            <section className={`${block}__description-section`}>
                <ul className={`${block}__show`}>
                    <li><p>Name: </p></li>
                    <li><p>Last name: </p></li>
                    <li><p>ID: </p></li>
                    <li><p>Email: </p></li>
                    <li><p>Source of income: </p></li>
                </ul>
                <form method='PUT' className={`${block}__edit`}>
                    <div>
                        <label htmlFor='inName'>Name: </label>
                        <input id='inName'/>
                    </div>
                    <div>
                        <label htmlFor='inLastName'>Last name: </label>
                        <input id='inLastName'/>
                    </div>
                    <div>
                        <p>ID: </p>
                    </div>
                    <div>
                        <label htmlFor='inEmail'>Email: </label>
                        <input id='inEmail'/>
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
                </form>
            </section>
        </div>
    )
}

export default Profile