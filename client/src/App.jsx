
import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import Home from './components/homePage/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Footer from './components/footer/Footer'

function App() {
  

  return (
    <>
    <Header/>
    <main id="main-content">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/logout'/>
      <Route path='/cameras' />
      <Route path='/cameras/:cameraId/details'/>
      <Route path='/cameras/:cameraId/edit'/>
      <Route path='/cameras/create'/>
    </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
