import React, { useState, useEffect } from 'react'
import {
  Chip,
  TextField,
  Drawer,
  IconButton,
  RadioGroup,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  Autocomplete
} from '@mui/material/'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import service from '../../../service'

import './style.scss'

function FilterDrawer(props) {
  const [deviceInfo, setDeviceInfo] = useState()
  const [device, setDevice] = useState()
  const [optionDeviceVehicleRelations, setOptionDeviceVehicleRelations] = useState([])
  const [formData, setFormData] = useState({
    deviceVehicleRelations: [],
    ignition: 'each',
    maxSpeedLimit: false
  })

  useEffect(async () => {
    const resDeviceVehicleRelations = await service.getDeviceVehicleRelations()
    setOptionDeviceVehicleRelations(resDeviceVehicleRelations?.data?.data)
  }, [])

  function handleFormData(value, key) {
    const newFormData = { ...formData }
    newFormData[key] = value
    setFormData(newFormData)
  }

  function sendFilter() {
    const devices = []
    formData.deviceVehicleRelations.forEach((e) => {
      const { device } = optionDeviceVehicleRelations.find((deviceVehicle) => deviceVehicle.vehicle.id === e)
      devices.push(device.id)
    })
    props.handleFilter({ ...formData, devices })
    props.setOpenDrawer(false)
  }

  async function infoDevice() {
    const rest = await service.summaryReportByDeviceId(device.device.id)
    setDeviceInfo(rest?.data?.data)
  }

  return (
    <Drawer
      anchor="right"
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
      className="livetracking-filter-drawer"
      hideBackdrop
    >
      <div className="livetracking-filter-drawer-container">
        <div className="livetracking-filter-drawer-container-header">
          <IconButton component="span" onClick={() => props.setOpenDrawer(false)}>
            <CancelOutlinedIcon fontSize="large" />
          </IconButton>
          Canlı Takip Filtreleme
        </div>
        <div className="livetracking-filter-drawer-container-content">
          <Autocomplete
            multiple
            id="tags-filled"
            options={optionDeviceVehicleRelations.map((option) => option.vehicle.id)}
            value={formData.deviceVehicleRelations}
            getOptionLabel={(option) => `${option || ''}`}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={(option) => `${option.vehicle.id || ''}`}
                placeholder="Araç plakasına göre filtrele"
                label="Araç Plakası"
              />
            )}
            onChange={(event, newValue) => {
              handleFormData(newValue, 'deviceVehicleRelations')
            }}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Kontak</FormLabel>
            <RadioGroup
              row
              aria-label="kontak"
              name="row-radio-buttons-group"
              value={formData.ignition}
              onChange={(e) => handleFormData(e.target.value, 'ignition')}
            >
              <FormControlLabel value="open" control={<Radio size="small" />} label="Açık" />
              <FormControlLabel value="off" control={<Radio size="small" />} label="Kapalı" />
              <FormControlLabel value="each" control={<Radio size="small" />} label="Her ikisi de" />
            </RadioGroup>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={formData.maxSpeedLimit}
                onChange={(e) => handleFormData(e.target.value, 'maxSpeedLimit')}
              />
            }
            label="Hız limiti"
          />
          <Button onClick={sendFilter}>Filtrele</Button>
          <hr />
          <div className="livetracking-filter-drawer-container-content-info-area">
            <Autocomplete
              options={optionDeviceVehicleRelations}
              value={device || ''}
              getOptionLabel={(option) => `${option.vehicle?.id || ''}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Araç plakası"
                  label="Araç Plakası"
                />
              )}
              onChange={(event, newValue) => {
                setDevice(newValue)
              }}
            />
            <Button onClick={infoDevice}>Bilgi Al</Button>
            {deviceInfo ? (
              <div className="livetracking-filter-drawer-container-content-info-area-box">
                <div className="row">
                  <div className="left">Araç</div> <div className="right">{deviceInfo?.vehicle?.id}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">Cihaz</div> <div className="right">{deviceInfo?.device?.id}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">Motor</div> <div className="right">{deviceInfo?.engineOn ? 'Açık' : 'Kapalı'}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">GPS</div> <div className="right">{deviceInfo?.gpsOn ? 'Açık' : 'Kapalı'}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">Son Aktif Olma Tarihi</div>{' '}
                  <div className="right">{new Date(deviceInfo?.lastActivity).toLocaleString('tr')}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">Motorun Son Çalışma Tarihi</div>{' '}
                  <div className="right">{new Date(deviceInfo?.lastEngineActivity).toLocaleString('tr')}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">Kordinat</div> <div className="right">{deviceInfo?.coordinate}</div>{' '}
                </div>
                <div className="row">
                  <div className="left">Adres</div> <div className="right">{deviceInfo?.address}</div>{' '}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default FilterDrawer
