import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import { useHistory, useParams } from 'react-router-dom'
import { TDrawer, CustomInput } from 'components'
import { fields } from '../../constants/vehicle_group_relations/create_fields'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Create() {
  const history = useHistory()
  const routeParams = useParams()
  const [fieldsData, setFieldsData] = useState(fields())
  const [validation, setValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [autoOptions, setAutoOptions] = useState({
    groups: [],
    vehicles: []
  })

  useEffect(async () => {
    setIsLoading(true)
    const newAutoOptions = { ...autoOptions }
    const params = {
      size: 99999,
      page: 0
    }
    const res = await service.getVehicleGroups(params)
    newAutoOptions['groups'] = res?.data?.data
    const res_vehicle = await service.getVehicles(params)
    newAutoOptions['vehicles'] = res_vehicle?.data?.data
    setAutoOptions(newAutoOptions)

    if (routeParams.vehicleId) {
      const res_get_vehicle = await service.getVehicle(routeParams.vehicleId)
      const vehicle = res_get_vehicle?.data?.data
      const newFieldsData = [...fieldsData]
      newFieldsData[0].defaultValue = vehicle
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
    /*         setValidation(true)

        const formValidation = fieldsData.some((field) => field.validation(field.defaultValue) === true)
        if (formValidation) {
            setIsLoading(false)
            return
        } */

    const payload = {}
    for (const fieldKey in fieldsData) {
      const field = fieldsData[fieldKey]
      if (field.key !== 'id') {
        if (field.type === 'datetimeOffset') toIsoString(field.defaultValue)
        else payload[field.key] = field.defaultValue
      }
    }

    const result = await service.saveVehicleGroupRelations(payload)

    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      NotificationManager.success('Araç grup ilişkisi başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Araç grup ilişkisi eklenirken bir hata oluştu')
    }

    setIsLoading(false)
    closeDrawer()
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Araç Grup İlişkisi Ekle">
        <div style={{ padding: '20px' }}>
          {fieldsData.map((field, key) =>
            !field.notShow ? (
              <CustomInput
                type={field.type}
                key={key}
                options={autoOptions[field.options]}
                getOptionLabel={field.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                label={field.placeHolder}
                size="small"
                variant="outlined"
                fullWidth={field.fullWidth || true}
                value={fieldsData[key].defaultValue}
                error={validation && fieldsData[key].validation(fieldsData[key].defaultValue)}
                onChange={(event, newValue) => {
                  const newFieldsData = [...fieldsData]
                  newFieldsData[key].defaultValue = newValue
                  return setFieldsData(newFieldsData)
                }}
              />
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
