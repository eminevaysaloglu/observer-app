import React, { useState, useEffect } from 'react'
import { CircularProgress, Button, TextField } from '@mui/material'
import { useHistory } from "react-router-dom";
import {TDrawer} from 'components';
import { fields } from '../../constants/vehicle_metadata/create_fields';
import service from '../../service';
import { useParams } from "react-router-dom";
import NotificationManager from 'react-notifications/lib/NotificationManager'

function Edit(props) {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const [autoOptions, setAutoOptions] = useState({
        vehicles: [],
        keys: []
    })

    useEffect(() => {
        getVehicleMetadata()
    }, [])

    async function getVehicleMetadata() {
        setIsLoading(true)
        const p = {
            page: 0,
            size: 99999
        }
        const newFieldsData = [...fieldsData]
        const response = await service.getVehicleMetadata(params.id)
        const res_vehicle = response?.data?.data
        for (const vehicle_key in res_vehicle) {
            const vehicle_value = res_vehicle[vehicle_key];
            const index = newFieldsData.findIndex((value) => value.key === vehicle_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = vehicle_value
        }

        const newAutoOptions = { ...autoOptions }
        const res = await service.getVehicle(p)
        newAutoOptions["vehicles"] = res?.data?.data
        const resKeys = await service.getVehicleGroups(p)
        newAutoOptions["groups"] = resKeys?.data?.data
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
        const result = await service.updateVehicleMetadata(params.id, payload)
        if ([200,201].includes(result?.status)) {
            setFieldsData(fields())
            closeDrawer()
            NotificationManager.success("Araç altbilgisi başarılı bir şekilde güncellendi")
        } else {
            NotificationManager.error("Araç altbilgisi güncellenirken bir hata ile karşılaşıldı")
        }
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Araç Altbilgisi Düzenle">
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

