import React, { useEffect, useState } from 'react'
import { TModal, TBoxContainer } from 'components'
import PermissionTable from '../../components/PermissionTable'
import { useHistory, useParams } from 'react-router-dom'
import service from '../../service'
import './style.scss'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress } from '@mui/material'
import { NotificationManager } from 'react-notifications'

function show() {
  const [permissionByTitle, setPermissionByTitle] = useState([])
  const [rolePermissions, setRolePermissions] = useState([])
  const [rolePermissionByTitle, setRolePermissionByTitle] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingClick, setIsLoadingClick] = useState(false)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    getPermissions()
  }, [])

  function goBack() {
    history.goBack()
  }

  async function getPermissions() {
    setIsLoading(true)

    const rolePermissionResponse = await service.findAllByRoleIdAndWithPermission(params.id)
    const rolePermission = rolePermissionResponse?.data?.data
    const rolePermissionGroupByTitle = rolePermission?.map((e) => {
      const sp = e.permission.id.split('_')
      return {
        title: sp.splice(0, sp.length - 1).join(' '),
        permission: sp[sp.length - 1]
      }
    })

    const response = await service.getPermissions({ page: 0, size: 9999 })
    const permissions = response?.data?.data
    const permissionGroupByTitle = permissions?.map((e) => {
      const sp = e.id.split('_')
      return {
        title: sp.splice(0, sp.length - 1).join(' '),
        permission: sp[sp.length - 1]
      }
    })

    setRolePermissions(rolePermission)
    setRolePermissionByTitle(groupArrayOfObjects(rolePermissionGroupByTitle, 'title'))
    setPermissionByTitle(groupArrayOfObjects(permissionGroupByTitle, 'title'))
    setIsLoading(false)
  }

  function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  async function saveRolePermission(permissionId) {
    setIsLoadingClick(true)
    const payload = {
      role: { id: params.id, isDefault: true },
      permission: { id: permissionId }
    }

    const result = await service.saveRolePermission(payload)
    setIsLoadingClick(false)
    if (result?.status === 201) {
      NotificationManager.success('Rol İzin İlişkisi eklendi')
    } else {
      NotificationManager.error('Rol İzin İlişkisi eklenirken bir hata oluştu')
    }

    getPermissions()
  }

  async function deleteRolePermission(permissionId) {
    setIsLoadingClick(true)
    const rolePermission = rolePermissions.find((e) => e.permission.id === permissionId)
    const result = await service.deleteRolePermission(rolePermission.id)
    setIsLoadingClick(false)
    if (result?.status === 200) {
      NotificationManager.success('Rol İzin İlişkisi silindi')
    } else {
      NotificationManager.error('Rol İzin İlişkisi silinirken bir hata oluştu')
    }

    getPermissions()
  }

  return (
    <TModal fullWidth>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className="access-management-detail-modal">
          <div className="access-management-detail-modal-close-icon-button ma-20">
            <IconButton component="span" onClick={goBack}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="access-management-detail-modal-content ma-20">
            <PermissionTable
              title={`${params.id}`}
              permissions={permissionByTitle}
              rolePermissions={rolePermissionByTitle}
              saveRolePermission={saveRolePermission}
              deleteRolePermission={deleteRolePermission}
              loading={isLoadingClick}
            />
          </div>
        </div>
      )}
    </TModal>
  )
}

export default show
