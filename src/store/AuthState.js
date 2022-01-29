import React, { useState } from 'react'
import { auth } from '../utils/auth';
import AuthContext from './AuthContext';

function AuthState(props) {
    const user_string = localStorage.getItem('user')
    const user_json = user_string ? JSON.parse(user_string) : null
    const permissions_string = localStorage.getItem('permissions')
    const permissions_json = permissions_string ? JSON.parse(permissions_string) : []

    const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn)
    const [user, setIsUser] = useState(user_json)
    const [permissions, setPermissions] = useState(permissions_json)

    let initialState = {
        user,
        isLoggedIn,
        setIsLoggedIn,
        setIsUser,
        setPermissions,
        permissions
    };
    
    return (
        <AuthContext.Provider value={initialState}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
