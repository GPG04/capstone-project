import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleItem } from '../api'

export default function SingleItem() {
    const [item, setItem] = useState(null)
    let { id } = useParams()

    useEffect(() => {
        async function getSingleItem() {
            setItem(await fetchSingleItem( id ))
        }
        getSingleItem()
    }, [])
}