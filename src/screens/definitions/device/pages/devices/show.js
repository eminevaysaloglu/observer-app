import React, { useEffect, useState } from 'react'
import { TModal, ShowRow } from 'components'
import { useHistory, useParams } from 'react-router-dom'
import service from '../../service'
import './style.scss'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MainCard from 'components/ShowComponents/MainCard'
import SubCards from 'components/ShowComponents/SubCards'
import { CircularProgress } from '@mui/material'

function show() {
  const [device, setDevice] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    getDevice()
  }, [])

  function goBack() {
    history.goBack()
  }

  async function getDevice() {
    setIsLoading(true)
    let newDevice = {}
    const response = await service.getDevice(params.id)
    newDevice = response?.data?.data

    setDevice(newDevice)
    setIsLoading(false)
  }

  async function getVehicle(key, setSubDatas, setLoading) {
    setLoading()
    const res_vehicle = await service.getDeviceVehicleRelationByDeviceId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_vehicle?.data?.data ? [res_vehicle?.data?.data] : []
    setLoading()
    setSubDatas(newSubDatas)
  }

  async function getDeviceGroup(key, setSubDatas, setLoading) {
    setLoading()
    const res_deviceGroup = await service.getDeviceGroupRelationByDeviceId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_deviceGroup?.data?.data
    setLoading()
    setSubDatas(newSubDatas)
  }

  async function getMetadatas(key, setSubDatas, setLoading) {
    setLoading()
    const res_metadata = await service.getDeviceMetadataByDeviceId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_metadata?.data?.data || []
    setLoading()
    setSubDatas(newSubDatas)
  }
  function editUser() {
    history.push(`/definitions/devices/device/show/${params.id}/edit`)
  }

  function editGroup(data) {
    history.push(`/definitions/devices/device/show/${params.id}/device-group-relation/edit/${data.id}`)
  }

  function addGroup() {
    history.push(`/definitions/devices/device/show/${params.id}/device-group-relation/create/`)
  }

  function editMetadata(data) {
    history.push(`/definitions/devices/device/show/${params.id}/device-metadata/edit/${data.id}`)
  }

  function addMetadata() {
    history.push(`/definitions/devices/device/show/${params.id}/device-metadata/create/`)
  }

  function editVehicle(data) {
    history.push(`/definitions/devices/device/show/${params.id}/device-vehicle-relation/edit/${data.id}`)
  }

  function addVehicle() {
    history.push(`/definitions/devices/device/show/${params.id}/device-vehicle-relation/create/`)
  }

  const mainData = {
    title: 'Cihaz Bilgileri',
    edit: editUser,
    content: [
      { title: 'ID', description: `${device?.id}` },
      { title: 'Protokol', description: device?.dataProtocol },
      { title: 'Statüs', description: `${device?.status === 'ACTIVE' ? 'Aktif' : 'Pasif'}` }
    ]
  }

  const subDatas = [
    {
      title: 'Bağlı Grup',
      add: addGroup,
      edit: editGroup,
      onClick: (key, setSubDatas, setLoading) => {
        getDeviceGroup(key, setSubDatas, setLoading)
      },
      content: [{ renderCell: (row, random) => <ShowRow key={random} title="Grup" description={row?.group?.id || ''} /> }],
      datas: device?.groups
    },
    {
      title: 'Bağlı Araç',
      add: addVehicle,
      edit: editVehicle,
      onClick: (key, setSubDatas, setLoading) => {
        getVehicle(key, setSubDatas, setLoading)
      },
      content: [{ renderCell: (row, random) => <ShowRow key={random} title="Araç" description={row?.id || ''} /> }],
      datas: device?.vehicles
    },
    {
      title: 'Cihaz Altbilgileri',
      add: addMetadata,
      edit: editMetadata,
      onClick: (key, setSubDatas, setLoading) => {
        getMetadatas(key, setSubDatas, setLoading)
      },
      keyValue: true,
      datas: device?.metadatas
    }
  ]

  return (
    <TModal fullWidth>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className="user-detail-modal">
          <div className="user-detail-modal-close-icon-button ma-20">
            <IconButton component="span" onClick={goBack}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="user-detail-modal-content">
            <div className="left">
              <MainCard mainData={mainData} />
            </div>
            <div className="right w-100 ml-20">
              <SubCards subDatas={subDatas} />
            </div>
          </div>
        </div>
      )}
    </TModal>
  )
}

export default show
