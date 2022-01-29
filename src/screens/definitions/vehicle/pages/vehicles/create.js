import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { TDrawer } from 'components'
import { fields } from '../../constants/vehicles/create_fields'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Create() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [validation, setValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  async function saveFormData() {
    setIsLoading(true)
    setValidation(true)

    /* const formValidation = fieldsData.some((field) => field.validation(field.defaultValue) === true)
    if (formValidation) {
      setIsLoading(false)
      return
    } */

    const payload = {}
    for (const fieldKey in fieldsData) {
      const field = fieldsData[fieldKey]
      payload[field.key] = field.defaultValue
    }

    const result = await service.saveVehicle(payload)

    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      NotificationManager.success('Araç başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Araç kaydedilirken bir hata oluştu')
    }

    setIsLoading(false)
    closeDrawer()
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Araç Ekle">
        <div style={{ padding: '20px' }}>
          {fieldsData.map((field, key) =>
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
