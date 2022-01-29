import React, { useEffect, useState } from 'react'
import { TDrawer } from 'components'
import { useHistory, useParams } from "react-router-dom"
import { fields } from '../../constants/create_fields'
import { Button, TextField, CircularProgress } from '@mui/material'
import { NotificationManager } from 'react-notifications';
import service from '../../service';

function Edit() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()

    useEffect(() => {
        getCurrency()
    }, [])

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function getCurrency() {
        setIsLoading(true)

        const newFieldsData = [...fieldsData]
        const response = await service.getCurrency(params.id)
        const res_currency = response?.data?.data
        for (const currency_key in res_currency) {
            const currency_value = res_currency[currency_key];
            const index = newFieldsData.findIndex((value) => value.key === currency_key)
            if (index !== -1)
                newFieldsData[index].defaultValue = currency_value
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
        const result = await service.updateCurrency(params.id, payload)
        if (result?.status !== 200) {
            NotificationManager.error("Para birimi güncellenmedi")
        } else {
            NotificationManager.success("Para birimi güncellendi")
            closeDrawer()
        }            
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Para Birimi Düzenle">
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
                                <Button variant="contained" onClick={updateFormData}>Kaydet</Button>
                            </div>
                        </div>
                }
            </TDrawer>
        </div>
    )
}

export default Edit