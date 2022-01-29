import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/user_roles/create_fields'
import { Button, TextField, CircularProgress, Autocomplete } from '@mui/material'
import { NotificationManager } from 'react-notifications';
import service from '../../service';

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const routeParams = useParams()
    const [autoOptions, setAutoOptions] = useState({
        users: [],
        roles: []
    })

    useEffect(() => {
        getUserRoles()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getUserRoles() {
        setIsLoading(true)

        const newFieldsData = [...fieldsData]
        const response = await service.getUserRole(routeParams.id)
        const res_userRoles = response?.data?.data
        for (const userRoles_key in res_userRoles) {
            const userRoles_value = res_userRoles[userRoles_key];
            const index = newFieldsData.findIndex((value) => value.key === userRoles_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = userRoles_value
        }

        const newAutoOptions = { ...autoOptions }
        const params = {
            size: 99999,
            page: 0
        }
        const res = await service.getRoles(params)
        newAutoOptions["roles"] = res?.data?.data
        const resUsers = await service.getUsers(params)
        newAutoOptions["users"] = resUsers?.data?.data
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
        const result = await service.updateUserRoles(payload)
        if ([200, 201].includes(result?.status)) {
            setFieldsData(fields())
            closeDrawer()
            NotificationManager.success("Kullanıcı Rol İlişkisi başarılı bir şekilde güncellendi")
        } else {
            NotificationManager.error("Kulanıcı Rol İlişkisi güncellenirken bir hata ile karşılaşıldı")
        }
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Kullanıcı İzin Ekle">
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
                                        error={validation && fieldsData[key].validation(fieldsData[key].defaultValue)}
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
                        <Button variant="contained" onClick={updateFormData} disabled={isLoading}>Güncelle</Button>
                    </div>
                </div>
            </TDrawer>
        </div>
    )
}

export default Edit