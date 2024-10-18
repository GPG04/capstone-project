export async function fetchAllItems() {
    try {
        const response = await fetch('/api/items')
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function fetchSingleItem( id ) {
    try {
        const response = await fetch(`/api/items/${id}`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function fetchReviews( id ) {
    try {
        const response = await fetch(`/api/items/${id}/reviews`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function fetchComments( itemId, reviewId ) {
    try {
        const response = await fetch(`/api/items/${itemId}/reviews/${reviewId}/comments`)
    } catch (error) {
        console.error(error)
    }
}