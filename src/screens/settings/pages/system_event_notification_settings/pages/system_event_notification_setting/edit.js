import React, { useState, useEffect } from 'react'
import { CustomInput, TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/create_fields'
import { Button } from '@mui/material'
import service from '../../service'
import { NotificationManager } from 'react-notifications'
import { toIsoString } from 'utils/locale'

function Edit() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [validation, setValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const routeParams = useParams()
  const [autoOptions, setAutoOptions] = useState({
    events: [],
    userNotifications: [],
    users: []
  })

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  useEffect(async () => {
    setIsLoading(true)
  
    const newFieldsData = [...fieldsData]
    const response = await service.getSystemEventNotificationSetting(routeParams.id)
    const res_roles = response?.data?.data
    for (const roles_key in res_roles) {
        const roles_value = res_roles[roles_key];
        const index = newFieldsData.findIndex((value) => value.key === roles_key)
        if (index !== -1)
            newFieldsData[index].defaultValue = roles_value
    }

    const newAutoOptions = { ...autoOptions }
    const res = await service.getSystemEvents()
    newAutoOptions['events'] = res?.data?.data
    const res_user = await service.getUsers()
    newAutoOptions['users'] = res_user?.data?.data
    const res_user_notification = await service.getUserMethods()
    newAutoOptions['userNotifications'] = res_user_notification?.data?.data
    setAutoOptions(newAutoOptions)
    setIsLoading(false)
  }, [])

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
      if (field.type === 'datetimeOffset') payload[field.key] = toIsoString(field.defaultValue)
      else payload[field.key] = field.defaultValue
    }

    const result = await service.updateSystemEventNotificationSetting(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Sistem olay bildirimi başarılı bir şekilde güncellendi')
    } else {
      NotificationManager.error('Sistem olay bildirimleri güncellenirken bir hata ile karşılaşıldı')
    }

    setIsLoading(false)
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Sistem Olay Bildirimi Güncelle">
        <div style={{ padding: '20px' }}>
          {isLoading ? (
            <div>Yükleniyor...</div>
          ) : (
            fieldsData.map((field, key) =>
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
            )
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

export default Edit
