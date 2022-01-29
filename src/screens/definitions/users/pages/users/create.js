import React, { useState, useEffect } from 'react'
import { TDrawer } from 'components'
import { useHistory } from 'react-router-dom'
import { fields } from '../../constants/users/create_fields'
import { Button, TextField, Autocomplete } from '@mui/material'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Create() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [validation, setValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [autoOptions, setAutoOptions] = useState({
  })


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
    const result = await service.saveUser(payload)

    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Kullanıcı başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Kullanıcı kayıt edilirken bir hata ile karşılaşıldı')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Kullanıcı Ekle">
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
                    newFieldsData[key].defaultValue = e.target.value
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
            <Button variant="contained" onClick={saveFormData} disabled={isLoading}>
              Kaydet
            </Button>
          </div>
        </div>
      </TDrawer>
    </div>
  )
}

export default Create
