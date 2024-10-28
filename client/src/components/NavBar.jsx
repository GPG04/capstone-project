import { Link, BrowserRouter } from 'react-router-dom'
import '../App.css'

export default function NavBar({ auth, logout }) {

    return (
        <div id="navbar">
            <BrowserRouter>
                <Link to="/" className="navLink">Home</Link>
                {!auth.id && <Link to="/login" className="navLink">Log In</Link>}
                {auth.id && <Link to={`/profile/${auth.id}`} className="navLink">Profile</Link>}
                {auth.id && <p onClick={logout} className="navLink">Logout</p>}
            </BrowserRouter>
        </div>
    )
}