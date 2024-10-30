import { useState, useEffect } from 'react'
import ItemList from "./ItemList"
import SearchBar from "./SearchBar"
import { fetchAllItems } from "../api"

export default function Home() {
    const [items, setItems] = useState([])
    const [searchParam, setSearchParam] = useState("")

    useEffect(() => {
        async function getAllItems() {
            setItems(await fetchAllItems())
        }
        getAllItems()
    }, [])

    const itemsToDisplay = searchParam
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchParam)
    )
        : items

    return (
        <>
            <div>
                <SearchBar
                setSearchParam={setSearchParam}
                />
                <ItemList
                items={itemsToDisplay}
                />
            </div>
        </>
    )
}