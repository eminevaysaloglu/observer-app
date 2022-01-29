import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { leaflet_config, websocket_config } from 'constants/wsConfig'
import ConnectJs from 'utils/yerlem-connect'

import './style.scss'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function index() {
  const query = useQuery()
  const pass = query.get('pass')
  const connect = new ConnectJs()
  const [map, setMap] = useState()

  useEffect(() => {
    if (pass !== 'terra_software') return
    if (map) map.remove()
    const devices = []
    connect.initMap(leaflet_config)
    connect.disableFilter()
    connect.setFilteredDevices(devices)
    connect.enableMarkerCluster()

    setMap(connect.getLeafletMap())

    const stomp = connect.connect(websocket_config)
    return () => {
      stomp.disconnect()
      map.remove()
    }
  }, [])

  return <div id="leafletmap" className="leafletmap"></div>
}

export default index
