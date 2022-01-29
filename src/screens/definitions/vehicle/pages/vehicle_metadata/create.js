import React, { useState, useEffect } from 'react'
import { Button, TextField, Autocomplete } from '@mui/material'
import { useHistory, useParams } from 'react-router-dom'
import { TDrawer } from 'components'
import { fields } from '../../constants/vehicle_metadata/create_fields'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Create() {
  const history = useHistory()
  const routeParams = useParams()
  const [fieldsData, setFieldsData] = useState(fields())
  const [validation, setValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [autoOptions, setAutoOptions] = useState({
    vehicles: [],
    keys: []
  })


  useEffect(async () => {
    setIsLoading(true)
    const newAutoOptions = { ...autoOptions }
    const params = {
      size: 99999,
      page: 0
    }
    const res = await service.getVehicles(params)
    newAutoOptions['vehicles'] = res?.data?.data
    const resKeys = await service.getVehicleMetadataKeys(params)
    newAutoOptions['keys'] = resKeys?.data?.data
    setAutoOptions(newAutoOptions)

    if (routeParams.vehicleId) {
      const res_get_vehicle = await service.getVehicle(routeParams.vehicleId)
      const vehicle = res_get_vehicle?.data?.data
      const newFieldsData = [...fieldsData]
      newFieldsData[1].defaultValue = vehicle
      setFieldsData(newFieldsData)
    }
    
    setIsLoading(false)
  }, [])

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  async function saveFormData() {
    setIsLoading(true)
    /* setValidation(true)

        const formValidation = fieldsData.some((field) => field.validation(field.defaultValue) === true)
        if (formValidation) {
            setIsLoading(false)
            return
        } */

    const payload = {}
    for (const fieldKey in fieldsData) {
      const field = fieldsData[fieldKey]
      if (field.key !== 'id') payload[field.key] = field.defaultValue
    }

    const result = await service.saveVehicleMetadata(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Araç altbilgisi başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Araç altbilgisi kayıt edilirken bir hata ile karşılaşıldı')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Araç Altbilgisi Ekle">
        <div style={{ padding: '20px' }}>
          {fieldsData.map((field, key) =>
            !field.notShow ? (
              field.type === 'auto' ? (
                <Autocomplete
                  sx={{ marginTop: 3 }}
                  key={key}
                  disablePortal
                  options={autoOptions[field.options]}
                  getOptionLabel={field.label}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => {
                    return <TextField {...params} label={field.placeHolder} />
                  }}
                  onChange={(event, newValue) => {
                    const newFieldsData = [...fieldsData]
                    newFieldsData[key].defaultValue = newValue
                    return setFieldsData(newFieldsData)
                  }}
                />
              ) : (
                <TextField
                  sx={{ marginTop: 3 }}
                  type={field.type}
                  size="small"
                  label={field.placeHolder}
                  variant="outlined"
                  fullWidth
                  key={key}
                  value={fieldsData[key].defaultValue}
                  error={validation && fieldsData[key].validation(fieldsData[key].defaultValue)}
                  onChange={(e) => {
                    const newFieldsData = [...fieldsData]
                    if (field.type == 'number') newFieldsData[key].defaultValue = Number(e.target.value)
                    else newFieldsData[key].defaultValue = e.target.value
                    return setFieldsData(newFieldsData)
                  }}
                />
              )
            ) : null
          )}
          <div
            style={{
              display: 'flex',
              gridGap: 10,
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button variant="contained" onClick={saveFormData}>
              Kaydet
            </Button>
          </div>
        </div>
      </TDrawer>
    </div>
  )
}

export default Create
