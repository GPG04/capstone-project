import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleItem } from '../../api'
import Item from './Item'
import Reviews from './Reviews'

export default function SingleItem() {
    const [item, setItem] = useState(null)
    let { id } = useParams()

    useEffect(() => {
        async function getSingleItem() {
            setItem(await fetchSingleItem( id ))
        }
        getSingleItem()
    }, [])

    {if (item)
        return (
            <div>
                <Item item={item}/>
                <Reviews reviews={item.reviews}/>
            </div>
        )
    }
}