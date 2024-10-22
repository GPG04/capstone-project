import React from 'react'
import ListItem from './ListItem'

export default function ItemList({ items, searchParam, error }) {
    console.log(items)

    const itemsToDisplay = searchParam
    ? items.filter((item) =>
    item.name.toLowerCase().includes(searchParam)
    )
    : items

    console.log(itemsToDisplay)

    return (
        <>
        {error && <p>{error}</p>}
        {itemsToDisplay.map((item) => {
            return <ListItem key={item.id} item ={item} />
        })}
        </>
    )
}