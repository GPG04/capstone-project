import { useState, useEffect } from "react";
import { fetchItemsByUser, fetchReviewsByUser, fetchCommentsByUser } from '../api'
import ItemList from "./ItemList";

export default function ProfileShowcase({ user }) {
    const [items, setItems] = useState([])
    const [reviews, setReviews] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function getItemsByUser() {
            const response = await fetchItemsByUser( user.id )
            setItems(response)
        }

        async function getReviewsByUser() {
            const response = await fetchReviewsByUser( user.id )
            setReviews(response)
        }

        async function getCommentsByUser() {
            const response = await fetchCommentsByUser( user.id )
            setComments(response)
        }

        getItemsByUser()
        getReviewsByUser()
        getCommentsByUser()
    }, [])

    return (
        <div>
            <ItemList items={items}/>
        </div>
    )
}