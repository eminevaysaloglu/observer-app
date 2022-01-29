import React, { useState, useEffect } from 'react'
import { TDrawer, CustomInput } from 'components'
import { useHistory } from "react-router-dom"
import { fields } from '../../constants/device-alarm/create_fields'
import { Button, TextField, Autocomplete } from '@mui/material'
import service from '../../service'; 
import { NotificationManager } from 'react-notifications';
import { toIsoString } from 'utils/locale'

function Create() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [validation, setValidation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [autoOptions, setAutoOptions] = useState({})

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function saveFormData() {
        setIsLoading(true)
       /*  setValidation(true)

        const formValidation = fieldsData.some((field) => field.validation(field.defaultValue) === true)
        if (formValidation) {
            setIsLoading(false)
            return
        } */

        const payload = {}
        for (const fieldKey in fieldsData) {
            const field = fieldsData[fieldKey]
            if (field.key === 'id') continue

            if (field.type === 'datetimeOffset') {
                payload[field.key] = toIsoString(new Date(field.defaultValue))
            } else {
                payload[field.key] = field.defaultValue
            }
        }
        

        const result = await service.saveDeviceAlarms(payload)

        if ([200,201].includes(result?.status)) {
            setFieldsData(fields())
            NotificationManager.success("Cihaz alarmı başarılı bir şekilde kayıt edildi")
        } else {
            NotificationManager.error("Cihaz alarmı eklenirken bir hata oluştu")
        }

        setIsLoading(false)
        closeDrawer()
    }

    return (
      <div>
        <TDrawer closeDrawer={closeDrawer} title="Cihaz Alarmı Ekle">
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