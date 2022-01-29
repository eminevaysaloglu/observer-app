import React, { useEffect, useState, useContext } from 'react'
import { leaflet_config, websocket_config } from 'constants/wsConfig'
import ConnectJs from 'utils/yerlem-connect'
import classNames from 'classnames'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import RestoreIcon from '@mui/icons-material/Restore'
import { useLocation, useHistory } from 'react-router-dom'
import service from './service'
import { getQueryStringParams, setObjectQueryParams } from 'utils/query'
import {
  TextField,
  IconButton,
  Button,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material/'
import { TModal } from 'components'
import { DateTimePicker } from '@mui/lab'
import { toIsoString } from 'utils/locale'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import CloseIcon from '@mui/icons-material/Close'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FilterListIcon from '@mui/icons-material/FilterList'
import authContext from 'store/AuthContext'
import './style.scss'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

import './style.scss'

function tracking() {
  const AuthContext = useContext(authContext)
  const [liveFilterData, setLiveFilterData] = useState({
    devices: [],
    ignition: 'each',
    maxSpeedLimit: false
  })
  const [filterDataHistory, setFilterDataHistory] = useState()
  const [liveFormData, setLiveFormData] = useState({
    deviceVehicleRelations: [],
    ignition: 'each',
    maxSpeedLimit: false
  })

  const [historyFormData, setHistoryFormData] = useState({
    id: null,
    beginDate: Date.now(),
    endDate: Date.now()
  })
  const [summaryReport, setSummaryReport] = useState({
    connectionLostDevices: [],
    engineOffDevices: [],
    engineOnDevices: []
  })
  const [devices, setDevices] = useState([])

  const [map, setMap] = useState()
  const [data, setData] = useState()
  const connect = new ConnectJs()
  const location = useLocation()
  const query = useQuery()
  const history = useHistory()
  const fScreen = query.get('screen') === 'full'
  const info = query.get('modal') === 'info'
  const tabValue = query.get('type') === 'history' ? 1 : 0
  const [optionDeviceVehicleRelations, setOptionDeviceVehicleRelations] = useState([])
  const [device, setDevice] = useState()
  const [deviceInfo, setDeviceInfo] = useState()
  const [liveContainerOpen, setLiveContainerOpen] = useState(false)

  function activeClass(index) {
    return classNames(
      { active: tabValue === index },
      'flex flex-col items-center justify-center border border-gray-500 rounded-l hover:border-gray-300 cursor-pointer bg-white w-24 h-24'
    )
  }

  function fullScrenTabClass() {
    return classNames(
      { active: fScreen },
      'flex flex-col items-center justify-center border border-gray-500 rounded-l hover:border-gray-300 cursor-pointer bg-white w-24 h-24'
    )
  }

  function fullScreenClass() {
    return classNames(
      {
        fixed: fScreen
      },
      'z-50 bg-white w-full h-full left-0 top-0 right-0 bottom-0 livetracking-container'
    )
  }

  function sendFilterHistory() {
    const sendFormData = {
      id: historyFormData.id,
      beginDate: toIsoString(new Date(historyFormData.beginDate)),
      endDate: toIsoString(new Date(historyFormData.endDate))
    }
    setFilterDataHistory(sendFormData)
  }

  function sendFilterLive() {
    const devices = []
    liveFormData.deviceVehicleRelations.forEach((e) => {
      const { device } = optionDeviceVehicleRelations.find((deviceVehicle) => deviceVehicle.vehicle.id === e)
      devices.push(device.id)
    })
    const filterData = { ...liveFormData, devices }
    const newFilterData = {
      ...liveFilterData
    }
    newFilterData.devices = filterData.devices
    newFilterData.maxSpeedLimit = filterData.maxSpeedLimit
    newFilterData.ignition = filterData.ignition

    setLiveFilterData(newFilterData)
  }

  function handleHistoryFormData(value, key) {
    const newFormData = { ...historyFormData }
    newFormData[key] = value
    setHistoryFormData(newFormData)
  }

  function handleLiveFormData(value, key) {
    const newFormData = { ...liveFormData }
    newFormData[key] = value
    setLiveFormData(newFormData)
  }

  function historyModalActiveClass() {
    return classNames(
      {
        hidden: tabValue === 0
      },
      'absolute z-50 right-3 top-3 bg-white rounded-lg flex flex-col p-2'
    )
  }

  function liveModalActiveClass() {
    return classNames({
      hidden: tabValue !== 0
    })
  }

  function closeInfoModal() {
    history.push('?' + setObjectQueryParams({ ...getQueryStringParams(location.search), modal: 'empty' }))
  }

  function liveFilterContainerOpen() {
    setLiveContainerOpen(!liveContainerOpen)
  }

  useEffect(async () => {
    const userId = AuthContext.user.user.id
    const resObserver = await service.getObserverByUserId(userId)
    const observerId = resObserver?.data?.data?.id
    const resRelations = await service.findAllRelationsByObserverId(observerId) 
    const relations = resRelations?.data?.data || []
    setOptionDeviceVehicleRelations(relations)
    
    if (!tabValue) {
      map?.remove()
      const res = await service.summaryReport()
      setSummaryReport(res?.data?.data)
      connect.initMap(leaflet_config)
      connect.setFilteredDevices(liveFilterData.devices.length !== 0 ? liveFilterData.devices: [...relations.map(e=>e.device.id), ...liveFilterData.devices])
      connect.setFilteredDevicesByIgnition(liveFilterData.ignition)
      connect.setFilteredDevicesByMaxSpeed(liveFilterData.maxSpeedLimit)

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
    } else {
      map?.remove()
      const res_devices = await service.getAllDevices()
      setDevices(res_devices?.data?.data)
      let data = ''

      if (filterDataHistory) {
        const result = await service.findAllByDeviceIdAndDeviceTimeBetween(filterDataHistory)
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
    }
  }, [liveFilterData, filterDataHistory])

  useEffect(() => {
    setDevice()
    setDeviceInfo()
    setFilterDataHistory()
    setData()
    setHistoryFormData({
      id: null,
      beginDate: Date.now(),
      endDate: Date.now()
    })
  }, [location])

  useEffect(async () => {
    if (device) {
      const rest = await service.summaryReportByDeviceId(device.device.id)
      setDeviceInfo(rest?.data?.data)
    }
    return () => {
      setDevice()
    }
  }, [device])

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
      ws.addRow({ vehiclePlate, coordinate, deviceTime: `${new Date(deviceTime).toLocaleString('tr')}`, speed: `${speed}` })
    })

    const buf = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buf]), `${new Date()}.xlsx`)
  }

  return (
    <div className={fullScreenClass()}>
      <div id="leafletmap">
        <div className={liveModalActiveClass()}>
          <div className={'absolute z-50 right-3 bottom-3 w-56 rounded-lg bg-white p-5'}>
            <div>Motoru Açık Olan Sayısı : {summaryReport?.engineOnDevices?.length || 0}</div>
            <div>Motoru Kapalı Olan Sayısı : {summaryReport?.engineOffDevices?.length || 0}</div>
            <div>Bağlantısı Kopan Sayısı : {summaryReport?.connectionLostDevices?.length || 0}</div>
            <div>
              Toplam Araç Sayısı :{' '}
              {summaryReport?.connectionLostDevices?.length +
                summaryReport?.engineOffDevices?.length +
                summaryReport?.engineOnDevices?.length || 0}
            </div>
          </div>
        </div>
        <div className={historyModalActiveClass()}>
          <Autocomplete
            options={optionDeviceVehicleRelations.map((option) => option.device.id)}
            value={historyFormData.id}
            getOptionLabel={(option) => option}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label={(option) => `${option?.id || ''}`}
                placeholder="Cihaz no göre filtrele"
                label="Cihaz No"
                sx={{ marginBottom: 2 }}
              />
            )}
            onChange={(event, newValue) => {
              handleHistoryFormData(newValue, 'id')
            }}
          />
          <DateTimePicker
            label="Başlangıç Tarihi"
            ampm={false}
            value={historyFormData.beginDate}
            onChange={(e) => handleHistoryFormData(e, 'beginDate')}
            renderInput={(params) => <TextField size="small" sx={{ marginBottom: 2 }} {...params} />}
          />
          <DateTimePicker
            label="Bitiş Tarihi"
            ampm={false}
            value={historyFormData.endDate}
            onChange={(e) => handleHistoryFormData(e, 'endDate')}
            renderInput={(params) => <TextField size="small" sx={{ marginBottom: 2 }} {...params} />}
            minDate={historyFormData.beginDate}
            minTime={historyFormData.beginDate}
            maxDate={Date.now()}
            maxTime={Date.now()}
            disableIgnoringDatePartForTimeValidation
          />

          <Button variant="contained" onClick={sendFilterHistory}>
            Filtrele
          </Button>
          {data ? (
            <Button
              className="livetracking-container-filter-area-filter-button"
              variant="contained"
              sx={{ backgroundColor: '#2e3448', marginBottom: 2 }}
              onClick={downloadExcel}
            >
              Excel'e Aktar
            </Button>
          ) : null}
        </div>
        <div className={'absolute  z-50 right-5 top-5 rounded-lg'}>
          <div className={liveModalActiveClass()}>
            <div
              onClick={liveFilterContainerOpen}
              className={`flex flex-col items-center justify-center border border-gray-500 rounded-l hover:border-gray-300 cursor-pointer bg-white w-24 h-24 ml-2`}
            >
              <FilterListIcon fontSize="large" />
              <div>Filtrele</div>
            </div>
            {liveContainerOpen ? (
              <div className="absolute bg-white rounded-lg top-full w-96 right-0 select-none p-5 flex flex-col">
                <Autocomplete
                  multiple
                  className="mb-5"
                  id="tags-filled"
                  options={optionDeviceVehicleRelations.map((option) => option.vehicle.id)}
                  value={liveFormData.deviceVehicleRelations}
                  getOptionLabel={(option) => `${option || ''}`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={(option) => `${option.vehicle.id || ''}`}
                      placeholder="Araç plakasına göre filtrele"
                      label="Araç Plakası"
                      size="small"
                    />
                  )}
                  onChange={(event, newValue) => {
                    handleLiveFormData(newValue, 'deviceVehicleRelations')
                  }}
                />
                <FormControl component="fieldset" className="mt-5">
                  <FormLabel component="legend">Kontak</FormLabel>
                  <RadioGroup
                    row
                    aria-label="kontak"
                    name="row-radio-buttons-group"
                    value={liveFormData.ignition}
                    onChange={(e) => handleLiveFormData(e.target.value, 'ignition')}
                  >
                    <FormControlLabel value="open" control={<Radio size="small" />} label="Açık" />
                    <FormControlLabel value="off" control={<Radio size="small" />} label="Kapalı" />
                    <FormControlLabel value="each" control={<Radio size="small" />} label="Her ikisi de" />
                  </RadioGroup>
                </FormControl>
                <Button onClick={sendFilterLive}>Filtrele</Button>
              </div>
            ) : null}
          </div>
        </div>
        {info ? (
          <TModal>
            <div>
              <div className="flex justify-end items-end py-2 px-1">
                <IconButton component="span" onClick={closeInfoModal}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="p-5 flex flex-col">
                <Autocomplete
                  options={optionDeviceVehicleRelations}
                  value={device || ''}
                  getOptionLabel={(option) => `${option.vehicle?.id || ''}`}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Araç plakası" label="Araç Plakası" />
                  )}
                  onChange={(event, newValue) => {
                    setDevice(newValue)
                  }}
                />
                {deviceInfo ? (
                  <div className="mt-5 border rounded-lg border-gray-500 p-5">
                    <div className="flex">
                      <div className="font-bold w-1/3">Araç</div> <div className="w-2/3">{deviceInfo?.vehicle?.id}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">Cihaz</div> <div className="w-2/3">{deviceInfo?.device?.id}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">Motor</div>{' '}
                      <div className="w-2/3">{deviceInfo?.engineOn ? 'Açık' : 'Kapalı'}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">GPS</div>{' '}
                      <div className="w-2/3">{deviceInfo?.gpsOn ? 'Açık' : 'Kapalı'}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">Son Aktif Olma Tarihi</div>{' '}
                      <div className="w-2/3">{new Date(deviceInfo?.lastActivity).toLocaleString('tr')}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">Motorun Son Çalışma Tarihi</div>{' '}
                      <div className="w-2/3">{new Date(deviceInfo?.lastEngineActivity).toLocaleString('tr')}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">Kordinat</div> <div className="w-2/3">{deviceInfo?.coordinate}</div>{' '}
                    </div>
                    <div className="flex">
                      <div className="font-bold w-1/3">Adres</div> <div className="w-2/3">{deviceInfo?.address}</div>{' '}
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">Bilgi alabilirmek için bir cihaz seçiniz.</div>
                )}
              </div>
            </div>
          </TModal>
        ) : null}
      </div>
      <div className=" z-50 justify-center items-center mx-auto absolute  bottom-5 left-0 right-0 flex">
        <div className="p-2 shadow-black shadow-lg inline-flex bg-white">
          <div
            onClick={() => history.push('?' + setObjectQueryParams({ ...getQueryStringParams(location.search), type: 'live' }))}
            className={activeClass(0)}
          >
            <TrackChangesIcon fontSize="large" />
            <div>Canlı</div>
          </div>
          <div
            onClick={() =>
              history.push('?' + setObjectQueryParams({ ...getQueryStringParams(location.search), type: 'history' }))
            }
            className={`${activeClass(1)}, ml-2`}
          >
            <RestoreIcon fontSize="large" />
            <div>Geçmiş</div>
          </div>
          <div
            onClick={() =>
              history.push(
                fScreen
                  ? '?' + setObjectQueryParams({ ...getQueryStringParams(location.search), screen: 'notfull' })
                  : '?' + setObjectQueryParams({ ...getQueryStringParams(location.search), screen: 'full' })
              )
            }
            className={`${fullScrenTabClass()}, ml-2`}
          >
            <FullscreenIcon fontSize="large" />
            <div>Tam Ekran</div>
          </div>
          <div
            onClick={() => history.push('?' + setObjectQueryParams({ ...getQueryStringParams(location.search), modal: 'info' }))}
            className={`flex flex-col items-center justify-center border border-gray-500 rounded-l hover:border-gray-300 cursor-pointer bg-white w-24 h-24 ml-2`}
          >
            <HelpOutlineIcon fontSize="large" />
            <div>Bilgi Al</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default tracking
