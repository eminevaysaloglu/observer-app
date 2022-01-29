import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
} from "react-router-dom";
import './style.scss'
import { Authenticate } from '../screens'
import authContext from '../store/AuthContext';
import IsLoggedIn from './IsLoggedIn'
import { NotificationContainer } from 'react-notifications';

function MainContainer() {
    const AuthContext = useContext(authContext)

    return (
        <Router>
            {
                AuthContext.isLoggedIn ?
                    <IsLoggedIn /> :
                    <Authenticate />
            }
            <NotificationContainer />
        </Router>
    )
}

export default MainContainer

