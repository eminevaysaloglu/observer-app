import React, { useEffect, useState } from 'react'
import { TDrawer, CustomInput } from 'components'
import { useHistory, useParams } from 'react-router-dom'
import { fields } from '../../constants/entity_groups/create_fields'
import { Button, TextField, CircularProgress, Autocomplete } from '@mui/material'
import service from '../../service'
import { NotificationManager } from 'react-notifications'

function Edit() {
  const history = useHistory()
  const [fieldsData, setFieldsData] = useState(fields())
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const [autoOptions, setAutoOptions] = useState({})

  useEffect(() => {
    getData()
  }, [])

  function closeDrawer() {
    setTimeout(() => {
      history.goBack()
    }, 300)
  }

  async function getData() {
    setIsLoading(true)
    const newFieldsData = [...fieldsData]
    const response = await service.getEntityGroup(params.id)
    const res = response?.data?.data
    for (const key in res) {
      const value = res[key]
      const index = newFieldsData.findIndex((value) => value.key === key)
      if (index !== -1) newFieldsData[index].defaultValue = value
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
    const result = await service.updateEntityGroup(payload)
    if ([200, 201].includes(result?.status)) {
      setFieldsData(fields())
      closeDrawer()
      NotificationManager.success('Varlık Grubu başarılı bir şekilde güncellendi')
    } else {
      NotificationManager.error('Varlık Grubu güncellenirken bir hata ile karşılaşıldı')
    }
  }

  return (
    <div>
      <TDrawer closeDrawer={closeDrawer} title="Varlık Grubu Düzenle">
        <div style={{ padding: '20px' }}>
          {isLoading ? (
            <div>Yükleniyor...</div>
          ) : (
            fieldsData.map((field, key) =>
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
            )
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
