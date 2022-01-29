import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/notification-methods/create_fields'
import { Button, TextField, CircularProgress, Autocomplete } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications'

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const [autoOptions, setAutoOptions] = useState({
      users: []
    })

    useEffect(() => {
        getNotificationMethods()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getNotificationMethods() {
        setIsLoading(true)
        const p = {
          page: 0,
          size: 99999
        }
        const newFieldsData = [...fieldsData]
        const response = await service.getNotificationMethods(params.id)
        const res_notificationMethod = response?.data?.data
        for (const notificationMethod_key in res_notificationMethod) {
          const notificationMethod_value = res_notificationMethod[notificationMethod_key]
          const index = newFieldsData.findIndex((value) => value.key === notificationMethod_key)
          if (index !== -1) newFieldsData[index].defaultValue = notificationMethod_value
        }
        const newAutoOptions = { ...autoOptions }
        const res = await service.getUsers(p)
        newAutoOptions['users'] = res?.data?.data
        setAutoOptions(newAutoOptions)
        setFieldsData(newFieldsData)
        setIsLoading(false)
    }

    async function updateFormData() {
        const payload = {}
        for (const key in fieldsData) {
            const field = fieldsData[key]
            payload[field.key] = field.defaultValue
        }
        const result = await service.updateNotificationMethods(params.id, payload)
        if ([200,201].includes(result?.status)) {
            NotificationManager.success("Bildirim yöntemi başarılı bir şekilde güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error("Bildirim yöntemi eklenirken bir düzeltilirken oluştu")
        }
    }

    return (
      <div>
        <TDrawer closeDrawer={closeDrawer} title="Bildirim Yöntemi Düzenle">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div style={{ padding: '20px' }}>
              {fieldsData.map((field, key) =>
                !field.notShow ? (
                  field.type === 'auto' ? (
                    <Autocomplete
                      sx={{ marginTop: 3 }}
                      key={key}
                      disablePortal
                      value={fieldsData[key].defaultValue}
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