import React, { useEffect, useState } from 'react'
import { TDrawer, CustomInput } from 'components'
import { useHistory, useParams } from 'react-router-dom'
import { fields } from '../../constants/device_metadata_key/create_fields'
import { Button, TextField, CircularProgress } from '@mui/material'
import service from '../../service'

function Edit() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [isLoading, setIsLoading] = useState(false)
  const [autoOptions, setAutoOptions] = useState({})
  const params = useParams()

  useEffect(() => {
    getDeviceMetadataKey()
  }, [])

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  async function getDeviceMetadataKey() {
    setIsLoading(true)

    const newFieldsData = [...fieldsData]
    const response = await service.getDeviceMetadataKey(params.id)
    const res_deviceMetadataKey = response?.data?.data
    for (const deviceMetadataKey_key in res_deviceMetadataKey) {
      const deviceMetadataKey_value = res_deviceMetadataKey[deviceMetadataKey_key]
      const index = newFieldsData.findIndex((value) => value.key === deviceMetadataKey_key)
      if (index !== -1) newFieldsData[index].defaultValue = deviceMetadataKey_value
    }
    setFieldsData(newFieldsData)
    setIsLoading(false)
  }

  async function updateFormData() {
    const payload = {}
    for (const key in fieldsData) {
      const field = fieldsData[key]
      payload[field.key] = field.defaultValue
    }
    const result = await service.updateDeviceMetadataKey(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Cihaz altbilgi key başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Cihaz altbilgi key kayıt edilirken bir hata ile karşılaşıldı')
    }
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Metadata Key Ekle">
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
            <Button variant="contained" onClick={updateFormData} disabled={isLoading}>
              Kaydet
            </Button>
          </div>
        </div>
      </TDrawer>
    </div>
  )
}

export default Edit
