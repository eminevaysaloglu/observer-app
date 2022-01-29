import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/team-entities/create_fields'
import { Button, TextField, CircularProgress, Autocomplete } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const [autoOptions, setAutoOptions] = useState({
        teams: [],
        entities: []
    })

    useEffect(() => {
        getTeamEntity()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getTeamEntity() {
        setIsLoading(true)
        const p = {
            page: 0,
            size: 99999
        }
        const newFieldsData = [...fieldsData]
        const response = await service.getTeamEntity(params.id)
        const res_teamEntity = response?.data?.data
        for (const teamEntity_key in res_teamEntity) {
            const teamEntity_value = res_teamEntity[teamEntity_key];
            const index = newFieldsData.findIndex((value) => value.key === teamEntity_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = teamEntity_value
        }
        const newAutoOptions = { ...autoOptions }
        const res_teams = await service.getTeams(p)
        newAutoOptions["teams"] = res_teams?.data?.data
        const res_entitiy = await service.getEntities(p)
        newAutoOptions["entities"] = res_entitiy?.data?.data
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
        const result = await service.updateTeamEntities(payload)
        if ([200, 201].includes(result?.status)){
            NotificationManager.success("Güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error("Güncellenirken bir hata oluştu")
        }
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Takım Varlığı Düzenle">
                {
                    isLoading ?
                        <CircularProgress /> :
                        <div style={{ padding: '20px' }}>
                            {
                                fieldsData.map((field, key) => !field.notShow ?
                                    (
                                        field.type === 'auto' ?
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
                                            :
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
                                            }} />
                                        
                                    )
                                     : null)
                            }
                            <div style={{
                                display: 'flex',
                                gridGap: 10,
                                marginTop: 30,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Button variant="contained" onClick={updateFormData}>Gücelle</Button>
                            </div>
                        </div>
                }
            </TDrawer>
        </div>
    )
}

export default Edit