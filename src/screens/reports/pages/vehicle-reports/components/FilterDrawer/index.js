import React, { useState, useEffect } from 'react'
import { TextField, Drawer, IconButton, Button, Autocomplete } from '@mui/material/'
import { CustomInput } from 'components'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import service from '../../../../service'
import './style.scss'

function FilterDrawer(props) {
  const [optionDeviceVehicleRelations, setOptionDeviceVehicleRelations] = useState([])
  const [formData, setFormData] = useState({
    vehicleDevice: null,
    startDate: null,
    endDate: null,
    type: ''
  })

  useEffect(async () => {
    const res = await service.getDeviceVehicleRelations()
    setOptionDeviceVehicleRelations(res?.data?.data)
  }, [])

  function handleFormData(value, key) {
    const newFormData = { ...formData }
    newFormData[key] = value
    setFormData(newFormData)
  }

  function sendFilter() {
    props.handleFilter(formData)
    props.setOpenDrawer(false)
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
          Filtrele
        </div>
        <div className="livetracking-filter-drawer-container-content">
          <Autocomplete
            id="tags-filled"
            options={optionDeviceVehicleRelations}
            value={formData.vehicleDevice}
            getOptionLabel={(option) => `${option.vehicle.id || ''}`}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Araç Plakası" />}
            onChange={(event, newValue) => {
              handleFormData(newValue, 'vehicleDevice')
            }}
          />
          <CustomInput
            type="select"
            items={[{ value: '', text: 'Açık/Kapalı' }, { value: 'ON', text: 'Açık' }, { value: 'OFF', text: 'Kapalı' }]}
            options={[]}
            getOptionLabel={''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Kontak"
            variant="outlined"
            fullWidth={true}
            value={formData.type}
            onChange={(event, newValue) => {
              handleFormData(newValue, 'type')
            }}
          />
          <CustomInput
            type="datetimeOffset"
            options={[]}
            getOptionLabel={''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Başlangıç Tarihi"
            variant="outlined"
            fullWidth={true}
            value={formData.startDate}
            onChange={(event, newValue) => {
              handleFormData(newValue?.toJSON(), 'startDate')
            }}
          />
          <CustomInput
            type="datetimeOffset"
            options={[]}
            getOptionLabel={''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="Bitiş Tarihi"
            size="small"
            variant="outlined"
            fullWidth={true}
            value={formData.endDate}
            onChange={(event, newValue) => {
              handleFormData(newValue?.toJSON(), 'endDate')
            }}
          />
          <Button onClick={sendFilter}>Filtrele</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default FilterDrawer
