import React, { useEffect, useState } from 'react'
import {
    useLocation
} from "react-router-dom";
import { leaflet_config, websocket_config } from 'constants/wsConfig'
import ConnectJs from 'utils/yerlem-connect'
import service from './service'

import './style.scss'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function index() {
    const query = useQuery();
    const vehicleIds = query.get('vehicleIds').split(',')
    const connect = new ConnectJs()
    const [map, setMap] = useState()
    useEffect(async () => {
        if (map) map.remove()
        const devices = vehicleIds

        connect.initMap(leaflet_config)

        connect.enablePolylineMeasure()
        connect.enableResponsivePopup()
        connect.setFilteredDevices(devices)
        connect.enableMobileView()

        setMap(connect.getLeafletMap())

        const stomp = connect.connect(websocket_config)

        return () => {
            stomp.disconnect()
            map.remove()
        }
    }, [])

    return (
        <div id="leafletmap" className="leafletmap">
        </div>
    )
}

export default index
