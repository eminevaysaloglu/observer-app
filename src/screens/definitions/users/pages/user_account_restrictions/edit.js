import React, { useState, useEffect } from 'react'
import { TDrawer, CustomInput } from 'components'
import { useHistory, useParams } from 'react-router-dom'
import { fields } from '../../constants/user_account_restrictions/create_fields'
import { Button } from '@mui/material'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Edit() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [isLoading, setIsLoading] = useState(false)
  const [autoOptions, setAutoOptions] = useState({
    accounts: []
  })

  const params = useParams()

  useEffect(() => {
    getUserAccountRestrictions()
  }, [])

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  async function getUserAccountRestrictions() {
    setIsLoading(true)

    const newFieldsData = [...fieldsData]
    const response = await service.getUserAccountRestriction(params.id)
    const res_userAccountRestrictions = response?.data?.data
    for (const userAccountRestrictions_key in res_userAccountRestrictions) {
      const userAccountRestrictions_value = res_userAccountRestrictions[userAccountRestrictions_key]
      const index = newFieldsData.findIndex((value) => value.key === userAccountRestrictions_key)
      if (index !== -1) newFieldsData[index].defaultValue = userAccountRestrictions_value
    }
    const newAutoOptions = { ...autoOptions }
    const paramsAll = {
      size: 99999,
      page: 0
    }
    const res = await service.getAccounts(paramsAll)
    newAutoOptions['accounts'] = res?.data?.data
    setAutoOptions(newAutoOptions)
    setFieldsData(newFieldsData)
    setIsLoading(false)
  }

  async function updateFormData() {
    setIsLoading(true)
    const payload = {}
    for (const key in fieldsData) {
      const field = fieldsData[key]
      payload[field.key] = field.defaultValue
    }
    payload.beginTime = toIsoString(payload.beginTime)
    payload.endTime = toIsoString(payload.endTime)
    const result = await service.updateUserAccountRestriction(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Kullanıcı hesap kısıtlaması başarılı bir şekilde kayıt edildi')
    } else {
      NotificationManager.error('Kullanıcı hesap kısıtlaması kayıt edilirken bir hata ile karşılaşıldı')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Kısıtlama Ekle">
        <div style={{ padding: '20px' }}>
          {fieldsData.map((field, key) =>
            !field.notShow ? (
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
                onChange={(event, newValue) => {
                  const newFieldsData = [...fieldsData]
                  newFieldsData[key].defaultValue = newValue
                  return setFieldsData(newFieldsData)
                }}
              />
            ) : null
          )}
          <div
            style={{
              display: 'flex',
              gridGap: 10,
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button variant="contained" onClick={updateFormData} disabled={isLoading}>
              Kaydet
            </Button>
          </div>
        </div>
      </TDrawer>
    </div>
  )
}

export default Edit
