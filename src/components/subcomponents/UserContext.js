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

export default UserContext