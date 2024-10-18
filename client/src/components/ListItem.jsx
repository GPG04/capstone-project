import React from 'react'

export default function listItem({ item }) {

    return (
        <div key={item.id} className="itemDiv">
            <img src={item.image} alt="image" />
            <div>
                <p>{image.name}</p>
                <p>{image.header}</p>
            </div>
        </div>
    )
}