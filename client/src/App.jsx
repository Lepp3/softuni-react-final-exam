
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
import { useState } from 'react'

function App() {
  const [authData,setAuth] = useState('');

  const userLoginHandler = (authData) =>{
    setAuth(authData)
  }

  return (
    <>
    <Header/>
    <main id="main-content">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login onLogin={userLoginHandler}/>}/>
      <Route path='/user/:userId' element={<ProfilePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/logout'/>
      <Route path='/cameras' element={<Catalog/>}/>
      <Route path='/cameras/:cameraId/details' element={<CameraDetails/>}/>
      <Route path='/cameras/:cameraId/edit'element={<CameraEdit/>}/>
      <Route path='/cameras/create' element={<CameraCreate/>}/>
    </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
