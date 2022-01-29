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
  const [vehicle, setVehicle] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    getVehicle()
  }, [])

  function goBack() {
    history.goBack()
  }

  async function getVehicle() {
    setIsLoading(true)
    let newVehicle = {}
    const response = await service.getVehicle(params.id)
    newVehicle = response?.data?.data
    setVehicle(newVehicle)
    setIsLoading(false)
  }

  async function getGroup(key, setSubDatas, setLoading) {
    setLoading()
    const res_vehicle_group_relation = await service.getVehicleGroupByVehicleId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_vehicle_group_relation?.data?.data
    setLoading()
    setSubDatas(newSubDatas)
  }

  async function getMetadatas(key, setSubDatas, setLoading) {
    setLoading()
    const res_metadata = await service.getVehicleMetadataByVehicleId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_metadata?.data?.data
    setLoading()
    setSubDatas(newSubDatas)
  }

  function editVehicle() {
    history.push(`/definitions/vehicles/vehicle/show/${params.id}/edit`)
  }

  function addGroup() {
    history.push(`/definitions/vehicles/vehicle/show/${params.id}/vehicle-group-relation/create`)
  }

  function editGroup(id) {
    history.push(`/definitions/vehicles/vehicle/show/${params.id}/vehicle-group-relation/edit/${id}`)
  }

  function addMetadata(id) {
    history.push(`/definitions/vehicles/vehicle/show/${params.id}/vehicle-metadata/create`)
  }

  function editMetadata(id) {
    history.push(`/definitions/vehicles/vehicle/show/${params.id}/vehicle-metadata/edit/${id}`)
  }

  const mainData = {
    title: 'Araç Bilgileri',
    edit: editVehicle,
    content: [
      { title: 'Plaka', description: vehicle?.id },
      { title: 'Marka', description: vehicle?.brand },
      { title: 'Model', description: vehicle?.model },
      { title: 'Motor Numarası', description: vehicle?.engineNumber },
      { title: 'Kapasite', description: vehicle?.load }
    ]
  }

  const subDatas = [
    {
      title: 'Araç Grubu',
      add: addGroup,
      edit: editGroup,
      onClick: (key, setSubDatas, setLoading) => {
        getGroup(key, setSubDatas, setLoading)
      },
      content: [{ renderCell: (row, random) => <ShowRow key={random} title="Grup" description={row.group?.id} /> }],
      datas: vehicle?.group
    },
    {
      title: 'Araç Altbilgiler',
      add: addMetadata,
      edit: editMetadata,
      onClick: (key, setSubDatas, setLoading) => {
        getMetadatas(key, setSubDatas, setLoading)
      },
      keyValue: true,
      datas: vehicle?.metadatas
    }
  ]

  return (
    <TModal fullWidth>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className="vehicle-detail-modal">
          <div className="vehicle-detail-modal-close-icon-button ma-10">
            <IconButton component="span" onClick={goBack}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="vehicle-detail-modal-content">
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
