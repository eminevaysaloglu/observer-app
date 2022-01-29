import { Button } from '@mui/material'
import { CustomInput } from 'components'
import React, { useEffect, useState } from 'react'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import service from './service'
import './style.scss'

function Account() {
    const [myUserAccountProperties, setMyUserAccountProperties] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        getData()
    }, [])

    async function getData(){
        setIsLoading(true)
        const res = await service.getMyProperties()
        setMyUserAccountProperties(res?.data?.data)
        setIsLoading(false)
    }

    async function updateAccountProperty(property) {
        setIsLoading(true)
        const res = await service.updateUserAccountProperty(property)
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
                            myUserAccountProperties.map((property, key) =>
                                <div className="account-contianer-item" key={key}>
                                    <div className="account-contianer-item-input">
                                        <CustomInput
                                            type="text"
                                            label={property.key.id}
                                            size="small"
                                            variant="outlined"
                                            fullWidth={true}
                                            value={myUserAccountProperties[key].value}
                                            onChange={(event, newValue) => {
                                                const newMyUserAccountProperties = [...myUserAccountProperties]
                                                newMyUserAccountProperties[key].value = newValue
                                                return setMyUserAccountProperties(newMyUserAccountProperties)
                                            }}
                                        />
                                    </div>
                                    <Button variant="contained" size="small" onClick={()=>updateAccountProperty(property)}>Güncelle</Button>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default Account
