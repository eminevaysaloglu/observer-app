import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields_edit } from '../../constants/users/create_fields'
import { Button, TextField, CircularProgress } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';
import {toIsoString} from 'utils/locale'

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields_edit())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        getUser()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getUser() {
        setIsLoading(true)

        const newFieldsData = [...fieldsData]
        const response = await service.getUser(params.id)
        const res_users = response?.data?.data
        for (const users_key in res_users) {
            const users_value = res_users[users_key];
            const index = newFieldsData.findIndex((value) => value.key === users_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = users_value
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
        const result = await service.updateUser(payload)
        if ([200, 201].includes(result?.status)){
            NotificationManager.success("Kullanıcılar başarılı bir şekilde güncellendi")
            closeDrawer()
        } else {
            NotificationManager.error("Kullanıcılar güncellenirken bir hata oluştu")
        }
           
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Kullanıcı Düzenle">
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
                                <Button variant="contained" onClick={updateFormData}>Güncelle</Button>
                            </div>
                        </div>
                }
            </TDrawer>
        </div>
    )
}

export default Edit