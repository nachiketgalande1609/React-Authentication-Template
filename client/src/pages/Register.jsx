import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function register() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Function to handle user registration
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('/register', {
        name, email, password
      })
      if (data.error) {
        // Display error message if registration fails
        toast.error(data.error)
      }
      else {
        // Clear form data and navigate to login page if registration succeeds
        setData({})
        navigate('/login')
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-4">
        <h1>Register</h1>
        <form onSubmit={registerUser} className="mt-4">
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control mb-3" placeholder="Enter name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control mb-3" placeholder="Enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control mb-3" placeholder="Enter password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  )
}
