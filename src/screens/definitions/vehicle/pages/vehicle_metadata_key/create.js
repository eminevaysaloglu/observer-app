import React, { useState, useEffect } from 'react'
import { Button, TextField, Autocomplete } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { TDrawer, CustomInput } from 'components'
import { fields } from '../../constants/vehicle_metadata_key/create_fields'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Create() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [validation, setValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [autoOptions, setAutoOptions] = useState({})

  useEffect(async () => {
    setIsLoading(true)
    const newAutoOptions = { ...autoOptions }
    const params = {
      size: 99999,
      page: 0
    }
    setAutoOptions(newAutoOptions)
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
      payload[field.key] = field.defaultValue
    }

    const result = await service.saveVehicleMetadataKey(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Araç altbilgi key başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Araç altbilgi key kayıt edilirken bir hata ile karşılaşıldı')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Araç Altbilgi Key Ekle">
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
