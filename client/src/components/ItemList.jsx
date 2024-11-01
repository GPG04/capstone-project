import React from 'react'

export default function ItemList({ items }) {

    return (
        <>
            <div id="itemList">
            {items.map((item) => {
                return (
                    <div key={item.id} className="itemDiv">
                        <div className="itemImgBlock">
                            <img src={item.image} alt="image" className="itemImg"/>
                        </div>
                        <div className="itemInfo">
                            <h2 className="itemName">{item.name}</h2>
                            <p className="itemHeader">{item.header}</p>
                        </div>
                    </div> 
                    )
                })}
            </div>
        </>
    )
}