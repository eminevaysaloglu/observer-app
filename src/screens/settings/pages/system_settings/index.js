import { Button } from '@mui/material'
import { CustomInput } from 'components'
import React, { useEffect, useState } from 'react'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import service from './service'
import './style.scss'

function Account() {
    const [settings, setSettings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(async () => {
        getData()
    }, [])

    async function getData(){
        setIsLoading(true)
        const res = await service.getSystemSettings({page: 0, size:500})
        setSettings(res?.data?.data)
        setIsLoading(false) 
    }

    async function updateSettings(property) {
        setIsLoading(true)
        const res = await service.updateSettings(property)
        if([200,201].includes(res?.status)) {
            NotificationManager.success("Özellik güncellendi")
            getData()
        } else {
            NotificationManager.error("Özellik güncellenemedi")
        }
        setIsLoading(false)
    }

    return (
        <div>
            {
                isLoading ?
                    <div>Yükleniyor...</div> :
                    <div className="account-contianer">
                        {
                            settings.map((property, key) =>
                                <div className="account-contianer-item" key={key}>
                                    <div className="account-contianer-item-input">
                                        <CustomInput
                                            type="text"
                                            label={property.id}
                                            size="small"
                                            variant="outlined"
                                            fullWidth={true}
                                            value={settings[key].value}
                                            onChange={(event, newValue) => {
                                                const newSettings = [...settings]
                                                newSettings[key].value = newValue
                                                return setSettings(newSettings)
                                            }}
                                        />
                                    </div>
                                    <Button variant="contained" size="small" onClick={()=>updateSettings(property)}>Güncelle</Button>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default Account
