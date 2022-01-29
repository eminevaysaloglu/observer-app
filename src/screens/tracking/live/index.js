import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material/'
import { leaflet_config, websocket_config } from 'constants/wsConfig'
import FilterDrawer from './components/FilterDrawer'
import '../style.scss'
import service from '../service/'
import ConnectJs from "utils/yerlem-connect";

function LiveTracking() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [filterData, setFilterData] = useState({
    devices: [],
    ignition: 'each',
    maxSpeedLimit: false
  })
  const [summaryReport, setSummaryReport] = useState({
    connectionLostDevices: [],
    engineOffDevices: [],
    engineOnDevices: []
  })
  const [map, setMap] = useState()
  const connect = new ConnectJs()

  useEffect(async () => {
    if (map) map.remove()
    const res = await service.summaryReport()
    setSummaryReport(res?.data?.data)

    connect.initMap(leaflet_config)
    connect.setFilteredDevices(filterData.devices)
    connect.setFilteredDevicesByIgnition(filterData.ignition)
    connect.setFilteredDevicesByMaxSpeed(filterData.maxSpeedLimit)

    setMap(connect.getLeafletMap())
    connect.enablePolylineMeasure()
    connect.enableZoomBox()
    connect.enableMarkerCluster({
      maxClusterRadius: 40
    })

    const stomp = connect.connect(websocket_config)

    return () => {
      stomp?.disconnect()
      map?.remove()
    }
  }, [filterData])

  function handleFilter(data) {
    if (data) {
      const newFilterData = {
        ...filterData
      }
      newFilterData.devices = data.devices
      newFilterData.maxSpeedLimit = data.maxSpeedLimit
      newFilterData.ignition = data.ignition
      setFilterData(newFilterData)
    }
  }

  return (
    <div className="livetracking-container">
      <div className="livetracking-container-filter-area">
        <FilterDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          handleFilter={(e) => handleFilter(e)}
          filterData={filterData}
        />
        <Button className='livetracking-container-filter-area-filter-button' size="small" variant="contained" onClick={() => setOpenDrawer(true)}>
          Filtrele
        </Button>
      </div>
      <div id="leafletmap" className="leafletmap">
        <div className="leafletmap-info">
          <div>Motoru Açık Olan Sayısı : {summaryReport?.engineOnDevices?.length || 0}</div>
          <div>Motoru Kapalı Olan Sayısı : {summaryReport?.engineOffDevices?.length || 0}</div>
          <div>Bağlantısı Kopan Sayısı : {summaryReport?.connectionLostDevices?.length || 0}</div>
          <div>Toplam Araç Sayısı : {summaryReport?.connectionLostDevices?.length + summaryReport?.engineOffDevices?.length + summaryReport?.engineOnDevices?.length || 0}</div>
        </div>
      </div>
    </div>
  )
}

export default LiveTracking
