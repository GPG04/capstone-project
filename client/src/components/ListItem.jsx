import React from 'react'
import '../App.css'

export default function listItem({ item }) {

    return (
        <div key={item.id} className="itemDiv">
            <img src={item.image} alt="image" className="itemImg"/>
            <div className="itemInfo">
                <h2 className="itemName">{item.name}</h2>
                <p className="itemHeader">{item.header}</p>
            </div>
        </div>
    )
}