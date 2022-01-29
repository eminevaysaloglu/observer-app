import React, { useEffect, useState } from 'react'
import { TDrawer, CustomInput } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/vehicle-ignition-alarm/create_fields'
import { Button, TextField, CircularProgress } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications'

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const [autoOptions, setAutoOptions] = useState({})
    const params = useParams()

    useEffect(() => {
        getVehicleIgnitionAlarms()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getVehicleIgnitionAlarms() {
      setIsLoading(true)
      const p = {
        page: 0,
        size: 99999
      }
      const newFieldsData = [...fieldsData]
      const response = await service.getVehicleIgnitionAlarm(params.id)
      const res_vehicleIgnitionAlarm = response?.data?.data
      for (const vehicleIgnitionAlarm_key in res_vehicleIgnitionAlarm) {
        const vehicleIgnitionAlarm_value = res_vehicleIgnitionAlarm[vehicleIgnitionAlarm_key]
        const index = newFieldsData.findIndex((value) => value.key === vehicleIgnitionAlarm_key)
        if (index !== -1) newFieldsData[index].defaultValue = vehicleIgnitionAlarm_value
      }
      setFieldsData(newFieldsData)
      setIsLoading(false)
    }

    async function updateFormData() {
        const payload = {}
        for (const key in fieldsData) {
          const field = fieldsData[key]
          if (field.key === 'id') continue

          if (field.type === 'datetimeOffset') {
            payload[field.key] = toIsoString(new Date(field.defaultValue))
          } else {
            payload[field.key] = field.defaultValue
          }
        }
        const result = await service.updateVehicleIgnitionAlarms(payload)
        if ([200,201].includes(result?.status)) {
            NotificationManager.success("Kontak alarmı başarılı bir şekilde güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error('Kontak alarmı düzeltilirken bir hata oluştu')
        }
    }

    return (
      <div>
        <TDrawer closeDrawer={closeDrawer} title="Kontak Alarmı Düzenle">
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