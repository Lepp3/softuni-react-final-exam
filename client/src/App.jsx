
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
import Logout from './components/logout/Logout'
import EditProfile from './components/edit-profile/EditProfile'
import usePersistedState from './hooks/usePersistedState'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import NotFound from './components/not-found/NotFound'


function App() {
  const [authData,setAuth] = usePersistedState({});

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
      <Route element={<GuestGuard/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Route>
      <Route path='/' element={<Home/>}/>
      <Route path='/user/:fetchedUser' element={<ProfilePage/>}/>
      <Route path='/cameras' element={<Catalog/>}/>
      <Route path='/cameras/:cameraId/details' element={<CameraDetails/>}/>
      <Route element={<AuthGuard/>}>
        <Route path='/cameras/:cameraId/edit'element={<CameraEdit/>}/>
        <Route path='/cameras/create' element={<CameraCreate/>}/>
        <Route path='/user/:fetchedUser/edit' element={<EditProfile/>}/> 
        <Route path='/logout' element={<Logout/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </main>
    <Footer/>
    </div>
    </UserContext.Provider>
  )
}

export default App
