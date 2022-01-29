import React, { useState } from 'react'
import { TDrawer } from 'components'
import { useHistory } from "react-router-dom"
import { fields } from '../../constants/roles/create_fields'
import { Button, TextField } from '@mui/material'
import service from '../../service';
import { NotificationManager } from 'react-notifications';

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

        const payload = {}
        for (const fieldKey in fieldsData) {
            const field = fieldsData[fieldKey];
            payload[field.key] = field.defaultValue
        }
        const result = await service.saveRole(payload)

        if ([200,201].includes(result?.status)) {
            setFieldsData(fields())
            closeDrawer()
            NotificationManager.success("Rol başarılı bir şekilde kayıt edildi")
        } else {
            NotificationManager.error("Rol kayıt edilirken bir hata ile karşılaşıldı")
        }

        setIsLoading(false)
        closeDrawer()
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Rol Ekle">
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
                        <Button variant="contained" onClick={saveFormData} disabled={isLoading}>Kaydet</Button>
                    </div>
                </div>
            </TDrawer>
        </div>
    )
}

export default Create