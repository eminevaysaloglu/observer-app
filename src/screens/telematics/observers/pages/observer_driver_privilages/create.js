import React, { useState, useEffect } from 'react'
import { CustomInput, TDrawer } from 'components'
import { useHistory } from "react-router-dom"
import { fields } from '../../constants/observer_driver_privilages/create_fields'
import { Button, TextField, Autocomplete } from '@mui/material'
import service from '../../service'; //UNUTMA!!
import { NotificationManager } from 'react-notifications';
import { toIsoString } from 'utils/locale'

function Create() {
    const history = useHistory();
    const [fieldsData, setFieldsData] = useState(fields())
    const [validation, setValidation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [autoOptions, setAutoOptions] = useState({
        observerDrivers: []
    })

    function closeDrawer() {
        setTimeout(() => {
            history.goBack()
        }, 300);
    }

    useEffect(async () => {
        setIsLoading(true)
        const newAutoOptions = { ...autoOptions }
        const params = {
            size: 99999,
            page: 0
        }
        const res = await service.getObserverDrivers(params)
        newAutoOptions["observerDrivers"] = res?.data?.data
        setAutoOptions(newAutoOptions)
        setIsLoading(false)
    }, [])

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
                    payload[field.key] = toIsoString(field.defaultValue)
                else
                    payload[field.key] = field.defaultValue
            }
        }

        const result = await service.saveObserverDriverAccessPrivilege(payload)
        if ([200, 201].includes(result?.status)) {
            setFieldsData(fields())
            closeDrawer()
            NotificationManager.success("Gözlemci Sürücü Erişimi başarılı bir şekilde kayıt edildi")
        } else {
            NotificationManager.error("Gözlemci Sürücü Erişimi kayıt edilirken bir hata ile karşılaşıldı")
        }

        setIsLoading(false)
    }

    return (
        <div>
            <TDrawer closeDrawer={closeDrawer} title="Gözlemci Sürücü Erişimi Ekle">
                <div style={{ padding: '20px' }}>
                    {
                        fieldsData.map((field, key) => !field.notShow ?
                            (
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
                                />
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
                        <Button variant="contained" onClick={saveFormData} disabled={isLoading}>Kaydet</Button>
                    </div>
                </div>
            </TDrawer>
        </div>
    )
}

export default Create