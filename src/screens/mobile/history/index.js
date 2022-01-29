import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ConnectJs from 'utils/yerlem-connect'
import { leaflet_config } from 'constants/wsConfig'
import services from './services'

import './style.scss'
import cookie from 'utils/cookie'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function LiveTracking() {
  const query = useQuery()
  const filterData = {
    id: query.get('vehicleId'),
    beginDate: query.get('beginDate'),
    endDate: query.get('endDate')
  }

  const token = query.get('token');
  const [map, setMap] = useState()
  const connect = new ConnectJs()

  useEffect(async () => {
    let data = ''
    if (map) map.remove()
    const result = await services.findAllByDeviceIdAndDeviceTimeBetween(filterData, `Bearer ${token}`)
    const coordinates = result?.data?.data?.map((e) => e.coordinate)
    if (coordinates) {
      data = coordinates?.join(':')
    }

    connect.initMap(leaflet_config)

    if (data !== '') {
      connect.addPolyline(data)
    }

    connect.enableMarkerCluster()
    setMap(connect.getLeafletMap())
    return () => {
      map?.remove()
    }
  }, [])

  return (
    <div className="livetracking-container-history">
      <div id="leafletmap" className="leafletmap"></div>
    </div>
  )
}

export default LiveTracking
