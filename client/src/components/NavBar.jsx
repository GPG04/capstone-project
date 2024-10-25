import { Link, BrowserRouter } from 'react-router-dom'
import '../App.css'

export default function NavBar({ auth }) {

    return (
        <div id="navbar">
            <BrowserRouter>
                <Link to="/" className="navLink">Home</Link>
                {!auth.id && <Link to="/login" className="navLink">Log In</Link>}
                {auth.id && <Link to="/profile" className="navLink">Profile</Link>}
            </BrowserRouter>
        </div>
    )
}