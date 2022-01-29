import React, { useState, useEffect } from 'react'
import { Chip, TextField, Drawer, IconButton, InputLabel, Button, FormControl, Select, MenuItem, CircularProgress, Radio } from '@mui/material/'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { DateTimePicker } from '@mui/lab';
import service from '../../service'

import './style.scss'

function FilterDrawer(props) {
    const [formData, setFormData] = useState(
        {
            id: "",
            beginDate: Date.now(),
            endDate: Date.now()
        }
    )

    const [isLoading, setIsLoading] = useState(false)

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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Cihaz</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.id}
                            label="Cihaz"

                            onChange={(e) => handleFormData(e.target.value, "id")}
                        >
                            {
                                props?.devices?.length === 0 ?
                                    (
                                        <MenuItem value="" className="device-is-not-found-in-filter">
                                            Cihaz bulunamadı
                                        </MenuItem>
                                    ) : (

                                        props?.devices?.map((device, key) => <MenuItem key={key} value={device.id}>{device.key}</MenuItem>)
                                    )
                            }
                        </Select>
                    </FormControl>
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
