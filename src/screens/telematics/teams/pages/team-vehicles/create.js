import React, { useState, useEffect } from 'react'
import { TDrawer, CustomInput } from 'components'
import { useHistory } from "react-router-dom"
import { fields } from '../../constants/team-vehicles/create_fields'
import { Button, TextField } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';

function Create() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [validation, setValidation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [autoOptions, setAutoOptions] = useState({
        teams: [],
        vehicles: []
    })

    useEffect(async () => {
        setIsLoading(true)
        const newAutoOptions = { ...autoOptions }
        const params = {
            size: 99999,
            page: 0
        }
        
        const res_team = await service.getTeams(params)
        newAutoOptions["teams"] = res_team?.data?.data
        
        const res_vehicle = await service.getVehicles(params)
        newAutoOptions["vehicles"] = res_vehicle?.data?.data
        setAutoOptions(newAutoOptions)
        setIsLoading(false)
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
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
            const field = fieldsData[fieldKey];
            if (field.key !== 'id') {
                if (field.type === 'datetimeOffset')
                    toIsoString(field.defaultValue)
                else
                    payload[field.key] = field.defaultValue
            }
        }

        const result = await service.saveTeamVehicles(payload)

        if ([200, 201].includes(result?.status)) {
            setFieldsData(fields())
            NotificationManager.success("Takım aracı başarılı bir şekilde kayıt edildi")
        } else {
            NotificationManager.error("Takım aracı kaydedilirken bir hata oluştu")
        }

        setIsLoading(false)

    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Takım Aracı Ekle">
                <div style={{ padding: '20px' }}>
                    {
                        fieldsData.map((field, key) => !field.notShow ?
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
                            /> : null)
                    }
                    <div style={{
                        display: 'flex',
                        gridGap: 10,
                        marginTop: 30,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button variant="contained" onClick={saveFormData} disabled={isLoading}>Kaydet</Button>
                    </div>
                </div>
            </TDrawer>
        </div>
    )
}

export default Create