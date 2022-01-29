import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/teams/create_fields'
import { Button, TextField, CircularProgress } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';
function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    useEffect(() => {
        getTeam()
    }, [])
    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }
    async function getTeam() {
        setIsLoading(true)
        const newFieldsData = [...fieldsData]
        const response = await service.getTeam(params.id)
        const res_team = response?.data?.data
        for (const team_key in res_team) {
            const team_value = res_team[team_key];
            const index = newFieldsData.findIndex((value) => value.key === team_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = team_value
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
        const result = await service.updateTeams(payload)
        if ([200, 201].includes(result?.status)){
            NotificationManager.success("Takım güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error("Takım güncellenirken bir hata oluştu")
        }
    }
    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Takım Düzenle">
                {
                    isLoading ?
                        <CircularProgress /> :
                        <div style={{ padding: '20px' }}>
                            {
                                fieldsData.map((field, key) => !field.notShow ?
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
                                    /> : null)
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