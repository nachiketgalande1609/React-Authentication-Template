import { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';

export default function Navbar() {
    // Accessing user context and navigate hook
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            const response = await axios.get(`/logout?timestamp=${Date.now()}`, {
                withCredentials: true // Ensure credentials are sent
            });

            if (response.status === 200) {
                console.log('Logged out successfully');
                setUser(null);          // Clear user context
                navigate('/login')      // Redirect to login page
            } else {
                console.error('Failed to logout:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                {/* Link to Home Page */}
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                {/* Link to Login */}
                                <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                            </li>
                            {/* Conditionally render register and login links based on user authentication */}
                            {!user && (
                                <>
                                    <li className="nav-item">
                                        <Link className='nav-link' to='/register'>Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className='nav-link' to='/login'>Login</Link>
                                    </li>
                                </>
                            )}
                            {/* Logout Button (if user is logged in) */}
                            {user && (
                                <li className="nav-item">
                                    <button className='nav-link' onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
