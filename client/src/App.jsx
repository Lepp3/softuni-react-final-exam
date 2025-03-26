
import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'

function App() {
  

  return (
    <>
    <Header/>
    <main id="main-content">
    <Routes>
      <Route path='/' />
      <Route path='/login'/>
      <Route path='/register'/>
      <Route path='/logout'/>
      <Route path='/cameras' />
      <Route path='/cameras/:cameraId/details'/>
      <Route path='/cameras/:cameraId/edit'/>
      <Route path='/cameras/create'/>
    </Routes>
    </main>
    </>
  )
}

export default App
