import React from 'react'

export default function ItemList({ items, searchParam, error }) {
    const itemsToDisplay = searchParam
    ? items.filter((item) =>
    item.name.toLowerCase().includes(searchParam)
    )
    : items

    return (
        <>
        {error && <p>{error}</p>}
        {itemsToDisplay.map((item) => {
            return <ListItem key={item.id} item ={item} />
        })}
        </>
    )
}