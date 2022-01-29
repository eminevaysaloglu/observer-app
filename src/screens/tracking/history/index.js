import React, { useEffect, useState } from 'react'
import { Button, TextField, Chip, Drawer, IconButton } from '@mui/material/'
import { leaflet_config, websocket_config } from 'constants/wsConfig'
import FilterDrawer from './components/FilterDrawer'
import { toIsoString } from 'utils/locale'
import services from './services'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import '../style.scss'
import ConnectJs from "../../../utils/yerlem-connect";

function LiveTracking() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [filterData, setFilterData] = useState()
  const [data, setData] = useState([])
  const [map, setMap] = useState()
  const connect = new ConnectJs()



  useEffect(async () => {
    let data = ''
    if (map) map.remove()

    if (filterData) {
      const result = await services.findAllByDeviceIdAndDeviceTimeBetween(filterData)
      const coordinates = result?.data?.data?.map((e) => e.coordinate)
      setData(result?.data?.data)
      if (coordinates) {
        data = coordinates?.join(':')
      }
    }

    connect.initMap(leaflet_config)

    //const $ExamplePolylineCoordinates = "37.83,32.83:37.84,32.84:37.85,32.85:37.86,32.86:37.87,32.87";
    if (data !== '') {
      connect.addPolyline(data)
    }

    setMap(connect.getLeafletMap())

    return () => {
      map?.remove()
    }
  }, [filterData])

  function handleFilter(data) {
    const sendFormData = {
      id: data.id,
      beginDate: toIsoString(new Date(data.beginDate)),
      endDate: toIsoString(new Date(data.endDate))
    }
    setFilterData(sendFormData)
  }

  async function downloadExcel() {
    const wb = new ExcelJS.Workbook()
    wb.creator = 'Terra Yazılım'
    wb.created = new Date()
    wb.modified = new Date()

    const ws = wb.addWorksheet()

    ws.columns = [
      { header: 'Araç Plakası', key: 'vehiclePlate', width: 32 },
      { header: 'Hız', key: 'speed', width: 32 },
      { header: 'Koordinat', key: 'coordinate', width: 40 },
      { header: 'Tarih', key: 'deviceTime', width: 45 }
    ]

    data.forEach((item) => {
      const { vehiclePlate, coordinate, deviceTime, speed } = item
      ws.addRow({ vehiclePlate, coordinate, deviceTime, speed: `${speed}` })
    })

    const buf = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buf]), `${new Date()}.xlsx`)
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
        <Button className='livetracking-container-filter-area-filter-button' size="small" variant="contained"  sx={{ backgroundColor: '#2e3448', marginRight: 2 }} onClick={downloadExcel}>
          Excel'e Aktar
        </Button>
        <Button  className='livetracking-container-filter-area-filter-button' size="small" variant="contained" onClick={() => setOpenDrawer(true)}>
          Zaman ve Araç Bilgisi
        </Button>
      </div>
      <div id="leafletmap" className="leafletmap"></div>
    </div>
  )
}

export default LiveTracking
