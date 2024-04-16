import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from '../context/userContext'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <div className="container">
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </UserContextProvider>
  )
}

export default App
