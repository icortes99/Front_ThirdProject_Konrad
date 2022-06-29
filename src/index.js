import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'
import AddMoney from './components/pages/AddMoney'
import History from './components/pages/History'
import LogIn from './components/pages/LogIn'
import Profile from './components/pages/Profile'
import Services from './components/pages/Services'
import SignUp from './components/pages/SignUp'
import Transfer from './components/pages/Transfer'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={'/'} exact element={<Home/>}/>
      <Route path={'/signup'} exact element={<SignUp />}/>
      <Route path={'/login'} exact element={<LogIn />}/>
      <Route path={'/dashboard'} exact element={<Dashboard />}/>
      <Route path={'/profile'} exact element={<Profile />}/>
      <Route path={'/addmoney'} exact element={<AddMoney />}/>
      <Route path={'/transfer'} exact element={<Transfer />}/>
      <Route path={'/services'} exact element={<Services />}/>
      <Route path={'/history'} exact element={<History />}/>
    </Routes>
  </BrowserRouter>
)