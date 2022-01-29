import React, { useEffect, useState } from 'react'
import { TModal } from 'components'
import { useHistory, useParams } from 'react-router-dom'
import service from '../../service'
import './style.scss'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MainCard from 'components/ShowComponents/MainCard'
import SubCards from 'components/ShowComponents/SubCards'
import { CircularProgress } from '@mui/material'

function show() {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    getUser()
  }, [])

  function goBack() {
    history.goBack()
  }

  async function getUser() {
    setIsLoading(true)

    let newUser = {}
    const response = await service.getUser(params.id)
    newUser = response?.data?.data

    setUser(newUser)
    setIsLoading(false)
  }

  async function getAddress(key, setSubDatas, setLoading) {
    setLoading()
    const res_useraddress = await service.getUserAddressByUserId(user?.yerlemId)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_useraddress?.data?.data
    setLoading()
    setSubDatas(newSubDatas)
  }

  async function getMetadatas(key, setSubDatas, setLoading) {
    setLoading()
    const res_metadata = await service.getUserMetaDataByUserId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_metadata?.data?.data
    setLoading()
    setSubDatas(newSubDatas)
  }

  async function getResrection(key, setSubDatas, setLoading) {
    setLoading()
    const res_restriction = await service.getUserAccountRestrictionByUserId(params.id)
    const newSubDatas = [...subDatas]
    newSubDatas[key].datas = res_restriction?.data?.data
    setLoading()
    setSubDatas(newSubDatas)
  }

  function editUser() {
    history.push(`/definitions/users/user/show/${params.id}/edit`)
  }

  function addUser() {
    history.push(`/definitions/users/user/show/${params.id}/create`)
  }

  function editRestriction(data) {
    history.push(`/definitions/users/user/show/${params.id}/user-account-restrictions/edit/${data.id}`)
  }

  function addRestriction() {
    history.push(`/definitions/users/user/show/${params.id}/user-account-restrictions/create/`)
  }

  function editAddress(data) {
    history.push(`/definitions/users/user/show/${params.id}/user-address/edit/${data.id}`)
  }

  function addAddress() {
    history.push(`/definitions/users/user/show/${params.id}/user-address/create/`)
  }

  const mainData = {
    title: 'Kullanıcı Bilgileri',
    edit: editUser,
    content: [
      { title: 'İsim Soyisim', description: `${user?.firstname} ${user?.lastname}` },
      { title: 'Email', description: user?.email },
      { title: 'İkinci Email', description: `${user?.secondaryEmail}` },
      { title: 'Konum', description: user?.locale }
    ]
  }

  const subDatas = [
    {
      title: 'Kullanıcı Adresi',
      add: addAddress,
      edit: editAddress,
      onClick: (key, setSubDatas, setLoading) => {
        getAddress(key, setSubDatas, setLoading)
      },
      content: [
        { title: 'Ülke', description: 'country' },
        { title: 'İl', description: 'city' },
        { title: 'İlçe', description: 'district' },
        { title: 'Sokak', description: 'street' },
        { title: 'Posta Kodu', description: 'postalCode' },
        { title: 'Koordinat', description: 'coordinate' }
      ],
      datas: user?.addresses
    },
    {
      title: 'Kullanıcı Altbilgiler',
      add: addRestriction,
      edit: addRestriction,
      onClick: (key, setSubDatas, setLoading) => {
        getMetadatas(key, setSubDatas, setLoading)
      },
      keyValue: true,
      datas: user?.metadatas
    },
    {
      title: 'Kullanıcı Kısıtlamaları',
      add: addRestriction,
      edit: editRestriction,
      onClick: (key, setSubDatas, setLoading) => {
        getResrection(key, setSubDatas, setLoading)
      },
      content: [
        { title: 'Başlangıç Zamanı', description: 'validityBeginDate' },
        { title: 'Başlangıç Saati', description: 'beginTime' },
        { title: 'Bitiş Zamanı', description: 'validityEndDate' },
        { title: 'Bitiş Saati', description: 'endTime' }
      ],
      datas: user?.restrictions
    }
  ]

  return (
    <TModal fullWidth>
      {isLoading ? (
        <div><CircularProgress /></div>
      ) : (
        <div className="user-detail-modal">
          <div className="user-detail-modal-close-icon-button ma-10">
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
