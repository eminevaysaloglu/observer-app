import React, { useState, useEffect } from 'react'
import { CircularProgress, Button, TextField } from '@mui/material'
import { useHistory } from "react-router-dom";
import {TDrawer} from 'components';
import { fields } from '../../constants/vehicle_groups/create_fields';
import service from '../../service';
import { useParams } from "react-router-dom";
import NotificationManager from 'react-notifications/lib/NotificationManager'

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        getVehicleGroups()
    }, [])

    async function getVehicleGroups() {
        setIsLoading(true)

        const newFieldsData = [...fieldsData]
        const response = await service.getVehicleGroups(params.id)
        const res_vehicle = response?.data
        for (const vehicle_key in res_vehicle) {
            const vehicle_value = res_vehicle[vehicle_key];
            const index = newFieldsData.findIndex((value) => value.key === vehicle_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = vehicle_value
        }

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
        const result = await service.updateVehicleGroups(params.id, payload)
        if ([200,201].includes(result?.status)) {
            NotificationManager.success("Araç grubu başarılı bir şekilde güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error("Araç grubu eklenirken bir düzeltilirken oluştu")
        }
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Araç Grup Düzenle">
                {isLoading ?
                    <CircularProgress /> :
                    <div style={{ padding: '20px' }}>
                        {
                            fields().map((field, key) =>
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
                                        if (field.type == "number")
                                            newFieldsData[key].defaultValue = Number(e.target.value)
                                        else
                                            newFieldsData[key].defaultValue = e.target.value
                                        return setFieldsData(newFieldsData)
                                    }}
                                />)
                        }
                        <div style={{
                            display: 'flex',
                            gridGap: 10,
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button variant="contained" onClick={updateFormData}>Düzenle</Button>
                        </div>
                    </div>
                }
            </TDrawer>
        </div>
    )
}

export default Edit

