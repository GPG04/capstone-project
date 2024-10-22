import { useState, useEffect } from 'react'
import ItemList from "./ItemList"
import SearchBar from "./SearchBar"
import { fetchAllItems } from "../api"

export default function Home() {
    const [items, setItems] = useState([])
    const [searchParam, setSearchParam] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getAllItems() {
            const response = await fetchAllItems()
            setItems(response)
        }
        getAllItems()
    }, [])

    return (
        <>
            <SearchBar
            searchParam={searchParam}
            setSearchParam={setSearchParam}/>
            <ItemList 
            items={items}
            searchParam={searchParam}
            error={error}/>
        </>
    )
}