import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

// Create user context
export const UserContext = createContext({})

export function UserContextProvider({children}) {
    // State to manage user data
    const [user, setUser] = useState(null)

    // Effect to fetch user data when component mounts
    useEffect(() => {
        // Fetch user profile if user is not logged in
        if(!user) {
            axios.get('/profile')
            .then(({data}) => {
                setUser(data)           // Set user data in context
            })
        }
    }, [])

    return(
        // Provide user context to children components
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}