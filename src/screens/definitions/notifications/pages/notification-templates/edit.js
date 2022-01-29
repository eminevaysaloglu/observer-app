import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/notification-templates/create_fields'
import { Button, TextField, CircularProgress } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications'

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        getNotificationTemplates()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getNotificationTemplates() {
      setIsLoading(true)
      const p = {
        page: 0,
        size: 99999
      }
      const newFieldsData = [...fieldsData]
      const response = await service.getNotificationTemplates(params.id)
      const res_notificationTemplate = response?.data?.data
      for (const notificationTemplate_key in res_notificationTemplate) {
        const notificationTemplate_value = res_notificationTemplate[notificationTemplate_key]
        const index = newFieldsData.findIndex((value) => value.key === notificationTemplate_key)
        if (index !== -1) newFieldsData[index].defaultValue = notificationTemplate_value
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
        const result = await service.updateNotificationTemplates(params.id, payload)
        if ([200,201].includes(result?.status)) {
            NotificationManager.success("Bildirim taslağı başarılı bir şekilde güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error('Bildirim taslağı düzeltilirken bir hata oluştu')
        }
    }

    return (
      <div>
        <TDrawer closeDrawer={closeDrawer} title="Bildirim Taslağı Düzenle">
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