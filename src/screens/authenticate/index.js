import React from 'react'
import {
    Switch,
    Route, Redirect
} from "react-router-dom";
import Login from './pages/login/Login'
import History from '../mobile/history'
import LiveTrackingByVehicleIds from '../mobile/liveTrackingByVehicleIds'
import Live from '../mobile/live'

function Authenticate() {
    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/live">
                <Live />
            </Route>
            <Route path="/liveTrackingByVehicleIds">
                <LiveTrackingByVehicleIds />
            </Route>
            <Route path="/history">
                <History />
            </Route>
            <Route path="*">
                <Redirect to="/login" />
            </Route>
        </Switch>
    )
}

export default Authenticate
