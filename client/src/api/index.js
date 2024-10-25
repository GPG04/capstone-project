const baseUrl = "http://localhost:3000/api"
export const token = window.localStorage.getItem("token")

export async function fetchAllItems() {
    try {
        const response = await fetch(`${baseUrl}/items`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function fetchSingleItem( id ) {
    try {
        const response = await fetch(`${baseUrl}/items/${id}`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function fetchReviews( id ) {
    try {
        const response = await fetch(`${baseUrl}/items/${id}/reviews`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function fetchComments( id ) {
    try {
        const response = await fetch(`${baseUrl}/reviews/${id}/comments`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function createUser(credentials) {
    const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const json = await response.json()
    if (response.ok) {
        console.log('Sign up successful')
    } else {
        console.log(json)
    }
}

export async function createToken(credentials) {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const json = await response.json()
    
    if (response.ok) {
        window.localStorage.setItem("token", json.token)
        authorize()
    }
}

export async function authorize() {
    const response = await fetch(`${baseUrl}/auth/me`, {
        headers: {
            authorization: token
        }
    })
    const json = await response.json()

    if (response.ok) {
        return json
    } else {
        console.error('not authorized')
    }
}