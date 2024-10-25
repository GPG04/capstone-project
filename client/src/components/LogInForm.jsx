import { useState } from 'react'
import { createToken, createUser } from '../api/index'
import '../App.css'

export default function LogInForm({ auth }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = (ev) => {
        ev.preventDefault()
        createToken({ username, password })
    }

    const signUp = (ev) => {
        ev.preventDefault()
        createUser({ username, password })

        login(ev)
    }

    return (
        <div>
            <form id="loginContainer">
                <input
                className="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                placeholder="username"
                />
                <input
                className="password"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder="password"
                />
                <button onClick={login} className="loginButton">Login</button>
                <button onClick={signUp} className="singUpButton">Sign Up</button>
            </form>
        </div>
    )
}