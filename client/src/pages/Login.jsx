import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

export default function Login() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    // Function to handle user login
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data: responseData } = await axios.post('/login', { email, password });
            if (responseData.error) {
                // Display error message if login fails
                toast.error(responseData.error);
            } else {
                // Display success message and update user context if login succeeds
                toast.success('Logged in successfully!')
                setUser(responseData);                          // Update user state with user data
                setData({ email: '', password: '' });           // Clear form data
                navigate('/dashboard');                         // Redirect to dashboard page
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-4">
                <h1>Login</h1>
                <form onSubmit={loginUser} className="mt-4">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control mb-3" placeholder="Enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control mb-3" placeholder="Enter password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
