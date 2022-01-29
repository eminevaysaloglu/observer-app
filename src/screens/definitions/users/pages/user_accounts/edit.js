import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/user_accounts/create_fields'
import { Button, TextField, CircularProgress, Autocomplete } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const [autoOptions, setAutoOptions] = useState({
        users: [],
    })
    const routeParams = useParams()

    useEffect(() => {
        getUserAccount()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getUserAccount() {
        setIsLoading(true)
        const newFieldsData = [...fieldsData]
        const response = await service.getUserAccount(routeParams.id)
        const res_userAccounts = response?.data?.data
        for (const userAccounts_key in res_userAccounts) {
            const userAccounts_value = res_userAccounts[userAccounts_key];
            const index = newFieldsData.findIndex((value) => value.key === userAccounts_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = userAccounts_value
        }
        const newAutoOptions = { ...autoOptions }
        const params = {
            size: 99999,
            page: 0
        }
        const res = await service.getUsers(params)
        newAutoOptions["users"] = res?.data?.data
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
        const result = await service.updateUserAccount(payload)
        if ([200, 201].includes(result?.status)) {
            closeDrawer()
            NotificationManager.success("Kullanıcı hesabı başarılı bir şekilde güncellendi")
        } else {
            NotificationManager.error("Kullanıcı hesabı güncellenirken hata oluştu")
        }
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Kullanıcı Adresi">
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
                        <Button variant="contained" onClick={updateFormData} disabled={isLoading}>Kaydet</Button>
                    </div>
                </div>
            </TDrawer>
        </div>
    )
}

export default Edit