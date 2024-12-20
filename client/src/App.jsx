import { useState, useEffect } from 'react'
import { authorize, token } from './api/index'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import LogInForm from './components/LogInForm'
import Profile from './components/Profile'
import SingleItem from './components/SingleItem/SingleItem'
import './App.css'


function App() {
  const [auth, setAuth] = useState({})

  async function verifyAuth() {
    if (token) {
      setAuth(await authorize())
    } else {
      console.error('not authorized')
      window.localStorage.removeItem("token")
    }
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    setAuth({})
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return (
    <>
      <div id="mainContainer">
        <NavBar
        auth={auth}
        logout={logout}
        />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/items/:id' element={<SingleItem/>}/>
            <Route path='/login' element={<LogInForm auth={auth}/>}/>
            <Route path='/profile/:id' element={<Profile auth={auth}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
