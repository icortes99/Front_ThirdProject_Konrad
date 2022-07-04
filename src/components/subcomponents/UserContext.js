import { useState, createContext } from 'react'

//const [finalUser, setFinalUser] = useState()

export const emptyUser = {
  token: '',
  idUser: 0,
  email: '',
  name: '',
  lastname: '',
  password: '',
  incomeSource: '',
  photo: ''
}

const UserContext = createContext()

export const InfoProvider = (props)=>{
  const [userState, setUserState] = useState(emptyUser)
  return(
    <UserContext.Provider value={[userState, setUserState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext