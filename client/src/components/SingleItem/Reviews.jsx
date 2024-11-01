export default function Reviews({ reviews }) {

    return (
        <>
            {Array.prototype.map(reviews, (review) => {
                return (
                    <div key={review.id}>
                        <div>{review.user.username}</div>
                        <div>{review.rating}</div>
                        <p>{review.text}</p>
                    </div>
                )
            })}
        </>
    )
    
    // if (reviews) {
    //     Array.prototype.map(reviews, (review) => {
    //         return (
    //             <div>
    //                 <div key={review.id}>
    //                     <div>{review.user.username}</div>
    //                     <div>{review.rating}</div>
    //                     <p>{review.text}</p>
    //                 </div>
    //                 <div>
    //                     {review.comments.map((comment) => {
    //                         return (
    //                             <div key={comment.id}>
    //                                 <div>{comment.user.username}</div>
    //                                 <p>{comment.text}</p>
    //                             </div>
    //                         )
    //                     })}
    //                 </div>
    //             </div>
    //         )}
    //     )
    // }
}