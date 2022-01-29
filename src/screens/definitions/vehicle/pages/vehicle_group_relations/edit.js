import React, { useState, useEffect } from 'react'
import { CircularProgress, Button, TextField, Autocomplete } from '@mui/material'
import { useHistory } from "react-router-dom";
import {TDrawer} from 'components';
import { fields } from '../../constants/vehicle_group_relations/create_fields';
import service from '../../service';
import { useParams } from "react-router-dom";
import NotificationManager from 'react-notifications/lib/NotificationManager'

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const [autoOptions, setAutoOptions] = useState({
      groups: [],
      vehicles: []
    })

    useEffect(() => {
        getVehicleGroupRelation()
    }, [])

    async function getVehicleGroupRelation() {
        setIsLoading(true)
        setIsLoading(true)
        const p = {
          page: 0,
          size: 99999
        }
        const newFieldsData = [...fieldsData]
        const response = await service.getVehicleGroupRelation(params.id)
        const res_vehicleGroupRelation = response?.data?.data
        for (const vehicleGroupRelation_key in res_vehicleGroupRelation) {
            const vehicleGroupRelation_value = res_vehicleGroupRelation[vehicleGroupRelation_key];
            const index = newFieldsData.findIndex((value) => value.key === vehicleGroupRelation_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = vehicleGroupRelation_value
        }
        const newAutoOptions = { ...autoOptions }
        const res_group = await service.getVehicleGroups(p)
        newAutoOptions['groups'] = res_group?.data?.data
        const res_vehicle = await service.getVehicles(p)
        newAutoOptions['vehicles'] = res_vehicle?.data?.data
        setAutoOptions(newAutoOptions)
        setFieldsData(newFieldsData)
        setIsLoading(false)
    }

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function updateFormData() {
        const payload = {}
        for (const key in fieldsData) {
            const field = fieldsData[key]
            payload[field.key] = field.defaultValue
        }
        const result = await service.updateVehicleGroupRelations(payload)
        if ([200,201].includes(result?.status)) {
            NotificationManager.success("Araç grup ilişkisi başarılı bir şekilde güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error("Araç grup ilişkisi düzeltilirken bir hata oluştu")
        }
    }

    return (
      <div>
        <TDrawer closeDrawer={closeDrawer} title="Araç Grup İlişkisi Düzenle">
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

