import { useState, useEffect } from "react";
import { fetchItemsByUser, fetchReviewsByUser, fetchCommentsByUser } from '../api'

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
        <div id="showcaseContainer">
            <div id="showcaseItemsContainer">
                {items.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.image}/>
                            <div>
                                <h2>{item.name}</h2>
                                <p>{item.header}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id="showcaseReviewsContainer">
                {reviews.map((review) => {
                    return (
                        <div key={review.id}>
                            {user.image && <img src={user.image}/>}
                            <div>{user.username}</div>
                            <div>{review.rating}</div>
                            <div>{review.text}</div>
                        </div>
                    )
                })}
            </div>
            <div id="showcaseCommentsContainer">
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            {user.image && <img src={user.image}/>}
                            <div>{user.username}</div>
                            <div>{comment.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}