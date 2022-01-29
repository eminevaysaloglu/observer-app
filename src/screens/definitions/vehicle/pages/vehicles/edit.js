import React, { useState, useEffect } from 'react'
import { CircularProgress, Button, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { TDrawer } from 'components'
import { fields } from '../../constants/vehicles/create_fields'
import service from '../../service'
import { useParams } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

function Edit(props) {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    getVehicle()
  }, [])

  async function getVehicle() {
    setIsLoading(true)

    const newFieldsData = [...fieldsData]
    const response = await service.getVehicle(params.id)
    const res_vehicle = response?.data?.data
    for (const vehicle_key in res_vehicle) {
      const vehicle_value = res_vehicle[vehicle_key]
      const index = newFieldsData.findIndex((value) => value.key === vehicle_key)
      if (index !== -1) newFieldsData[index].defaultValue = vehicle_value
    }

    setFieldsData(newFieldsData)
    setIsLoading(false)
  }

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  async function updateFormData() {
    const payload = {}
    for (const key in fieldsData) {
      const field = fieldsData[key]
      payload[field.key] = field.defaultValue
    }
    const result = await service.updateVehicle(payload)
    if ([200, 201].includes(result?.status)) {
      NotificationManager.success('Araç güncellendi')
      closeDrawer()
    } else {
      NotificationManager.error('Araç güncellenirken bir hata oluştu')
    }
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Araç Düzenle">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ padding: '20px' }}>
            {fields().map((field, key) =>
              !field.notShow ? (
                <TextField
                  sx={{ marginTop: 3 }}
                  type={field.type}
                  size="small"
                  label={field.placeHolder}
                  variant="outlined"
                  fullWidth
                  key={key}
                  value={fieldsData[key].defaultValue}
                  onChange={(e) => {
                    const newFieldsData = [...fieldsData]
                    if (field.type == 'number') newFieldsData[key].defaultValue = Number(e.target.value)
                    else newFieldsData[key].defaultValue = e.target.value
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
              <Button variant="contained" onClick={updateFormData}>
                Düzenle
              </Button>
            </div>
          </div>
        )}
      </TDrawer>
    </div>
  )
}

export default Edit
