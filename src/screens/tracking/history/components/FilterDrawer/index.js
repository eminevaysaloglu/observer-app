import React, { useState, useEffect } from 'react'
import { Chip, TextField, Drawer, IconButton, Button, Autocomplete } from '@mui/material/'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { DateTimePicker } from '@mui/lab'
import service from '../../services'

import './style.scss'

function FilterDrawer(props) {
  const [formData, setFormData] = useState({
    id: null,
    beginDate: Date.now(),
    endDate: Date.now()
  })

  const [devices, setDevices] = useState([])

  useEffect(async () => {
    const res_devices = await service.getAllDevices()
    setDevices(res_devices?.data?.data)
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
          Zaman ve Araç Bilgisi
        </div>
        <div className="livetracking-filter-drawer-container-content">
          <Autocomplete
            id="tags-filled"
            options={devices.map((option) => option.id)}
            value={formData.id}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={(option) => `${option?.id || ''}`}
                placeholder="Cihaz no göre filtrele"
                label="Cihaz No"
              />
            )}
            onChange={(event, newValue) => {
              handleFormData(newValue, 'id')
            }}
          />
          <DateTimePicker
            label="Başlangıç Tarihi"
            ampm={false}
            value={formData.beginDate}
            onChange={(e) => handleFormData(e, 'beginDate')}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <DateTimePicker
            label="Bitiş Tarihi"
            ampm={false}
            value={formData.endDate}
            onChange={(e) => handleFormData(e, 'endDate')}
            renderInput={(params) => <TextField size="small" {...params} />}
            minDate={formData.beginDate}
            minTime={formData.beginDate}
            maxDate={Date.now()}
            maxTime={Date.now()}
            disableIgnoringDatePartForTimeValidation
          />

          <Button onClick={sendFilter}>Filtrele</Button>
        </div>
      </div>
    </Drawer>
  )
}

export default FilterDrawer
