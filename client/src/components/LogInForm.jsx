import { useState } from 'react'
import { createToken, createUser } from '../api/index'

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
            <form>
                <input
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    placeholder="username"
                />
                <input
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder="password"
                />
                <button onClick={login}>Login</button>
                <button onClick={signUp}>Sign Up</button>
            </form>
        </div>
    )
}