import React, { useState } from 'react'
import { TDrawer } from 'components'
import { useHistory } from "react-router-dom"
import { fields } from '../../constants/create_fields'
import { Button, TextField } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';

function Create() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [validation, setValidation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    async function saveFormData() {
        setIsLoading(true)
        setValidation(true)

        const formValidation = fieldsData.some((field) => field.validation(field.defaultValue) === true)
        if (formValidation) {
            setIsLoading(false)
            return
        }

        const payload = {}
        for (const fieldKey in fieldsData) {
            const field = fieldsData[fieldKey];
            if (field.key !== 'id')
                payload[field.key] = field.defaultValue
        }
        payload.id = uuidv4()
        const result = await service.saveCurrency(payload)

        if (result?.status === 201) {
            setFieldsData(fields())
            NotificationManager.success("Para birimi başarılı bir şekilde kayıt edildi")
        }

        setIsLoading(false)
        closeDrawer()
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Para Birimi Ekle">
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
                                error={validation && fieldsData[key].validation(fieldsData[key].defaultValue)}
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
                        <Button variant="contained" onClick={saveFormData} disabled={isLoading}>Kaydet</Button>
                    </div>
                </div>
            </TDrawer>
        </div>
    )
}

export default Create