import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleUser, token } from "../api";
import ProfileShowcase from "./ProfileShowcase";

export default function Profile({ auth }) {
    const navigate = useNavigate()
    let { id } = useParams()

    const [user, setUser] = useState(null)
    const [authorized, setAuthorized] = useState(null)
    
    useEffect (() => {
        async function getSingleUser() {
            const response = await fetchSingleUser( id )
            setUser(response)
        }

        function isAuthorized() {
            if (
                token &&
                id === auth.id
            ) {
                setAuthorized(true)
            }
        }

        getSingleUser()
        isAuthorized()
    }, [])


    {if (user) {
        return (
            <div>
                <div>
                    
                </div>
                <ProfileShowcase user={user}/>
            </div>
        )
    }}
}