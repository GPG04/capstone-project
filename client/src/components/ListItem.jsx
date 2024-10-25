import React from 'react'
import '../App.css'

export default function listItem({ item }) {

    return (
        <div key={item.id} className="itemDiv">
            <img src={item.image} alt="image" />
            <div>
                <p>{item.name}</p>
                <p>{item.header}</p>
            </div>
        </div>
    )
}