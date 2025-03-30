
import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Home from './components/homePage/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Footer from './components/footer/Footer'
import Catalog from './components/catalog/Catalog'
import ProfilePage from './components/profile-page/ProfilePage'
import CameraCreate from './components/camera-create/CameraCreate'
import CameraEdit from './components/camera-edit/CameraEdit'
import CameraDetails from './components/camera-details/CameraDetails'
import { UserContext } from './contexts/UserContext'
import { useState } from 'react'
import Logout from './components/logout/Logout'
import EditProfile from './components/edit-profile/EditProfile'


function App() {
  const [authData,setAuth] = useState('');

  const userLoginHandler = (authData) =>{
    setAuth(authData)
  }

  const userLogoutHandler = () =>{
    setAuth({});
  }

  return (
    <UserContext.Provider value={{...authData, userLoginHandler,userLogoutHandler}}>
    <div id="box">
    <Header/>
    <main id="main-content">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/user/:fetchedUser' element={<ProfilePage/>}/>
      <Route path='/user/:fetchedUser/edit' element={<EditProfile/>}/>   
  
      <Route path='/register' element={<Register/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/cameras' element={<Catalog/>}/>
      <Route path='/cameras/:cameraId/details' element={<CameraDetails/>}/>
      <Route path='/cameras/:cameraId/edit'element={<CameraEdit/>}/>
      <Route path='/cameras/create' element={<CameraCreate/>}/>
    </Routes>
    </main>
    <Footer/>
    </div>
    </UserContext.Provider>
  )
}

export default App
