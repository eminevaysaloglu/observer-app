import React, { useState, useEffect } from 'react'
import { CircularProgress, Button, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { CustomInput, TDrawer } from 'components'
import { fields } from '../../constants/vehicle_metadata_key/create_fields'
import service from '../../service'
import { useParams } from 'react-router-dom'
import NotificationManager from 'react-notifications/lib/NotificationManager'

function Edit(props) {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const [autoOptions, setAutoOptions] = useState({})

  useEffect(() => {
    getVehicleMetadataKey()
  }, [])

  async function getVehicleMetadataKey() {
    setIsLoading(true)
    const p = {
      page: 0,
      size: 99999
    }
    const newFieldsData = [...fieldsData]
    const response = await service.getVehicleMetadataKey(params.id)
    const res_vehicle_metadata_key = response?.data?.data
    for (const vehicle_metadata_key in res_vehicle_metadata_key) {
      const vehicle_metadata_key_value = res_vehicle_metadata_key[vehicle_metadata_key]
      const index = newFieldsData.findIndex((value) => value.key === vehicle_metadata_key)
      if (index !== -1) newFieldsData[index].defaultValue = vehicle_metadata_key_value
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
    const result = await service.updateVehicleMetadataKey(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Araç altbilgi key başarılı bir şekilde güncellendi')
    } else {
      NotificationManager.error('Araç altbilgikey güncellenirken bir hata ile karşılaşıldı')
    }
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Araç Altbilgi Key Düzenle">
        {isLoading ? (
          <CircularProgress />
        ) : (
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
