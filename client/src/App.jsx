import { Routes, Route } from 'react-router-dom'                        // Importing Routes and Route from react-router-dom for routing
import Navbar from './components/Navbar'                                // Importing Navbar component
import Home from './pages/Home'                                         // Importing Home page component
import Login from './pages/Login'                                       // Importing Login page component
import Register from './pages/Register'                                 // Importing Register page component
import Dashboard from './pages/Dashboard'                               // Importing Dashboard page component
import axios from 'axios'                                               // Importing Axios for making HTTP requests
import { Toaster } from 'react-hot-toast'                               // Importing Toaster for displaying toast notifications
import 'bootstrap/dist/css/bootstrap.min.css';                          // Importing Bootstrap CSS
import { UserContextProvider } from '../context/userContext'            // Importing UserContextProvider from userContext.js


// Setting default configurations for Axios
axios.defaults.baseURL = 'http://localhost:8000'                        // Setting base URL for Axios requests
axios.defaults.withCredentials = true                                   // Allowing Axios to send cookies along with requests

function App() {

  return (
    // Wrapping the entire application with UserContextProvider to provide user context
    <UserContextProvider>
      <Navbar />
      <div className="container">
        {/* Rendering Toaster component for displaying toast notifications */}
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
