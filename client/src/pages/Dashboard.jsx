import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

export default function Dashboard() {
    // Accessing user context
    const {user} = useContext(UserContext)

    return (
        <div>
            <h1>Dashboard</h1>
            {/* Display user name and user email if user is logged in */}
            {!!user && (<h2>Hi {user.name}!</h2>)}
            {!!user && (<h2>Hi {user.email}!</h2>)}
        </div>
    )
}
