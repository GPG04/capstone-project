const baseUrl = "http://localhost:3000/api"

export async function fetchAllItems() {
    try {
        const response = await fetch(`${baseUrl}/items`)
        const result = await response.json()
        console.log(result)
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