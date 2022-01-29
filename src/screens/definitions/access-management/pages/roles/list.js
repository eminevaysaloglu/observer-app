import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import { columns } from '../../constants/roles/table_columns_data'
import rolesServices from '../../service'
import { Pagination, CircularProgress, Button } from '@mui/material'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { BASE_PATH } from '../../routes'
import InfoIcon from '@mui/icons-material/Info'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function RolesList() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <>
          <ButtonPermission permission="USER_READ" grid icon={<InfoIcon />} onClick={() => showRole(params)} label="Show" />
          <ButtonPermission permission="USER_UPDATE" grid icon={<EditIcon />} onClick={() => editRole(params)} label="Edit"></ButtonPermission>
          <ButtonPermission permission="USER_DELETE" grid icon={<DeleteIcon />} onClick={() => deleteRole(params)} label="Delete"></ButtonPermission>
        </>
      ]
    }
    columns.unshift(column)
  }, [])

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const payload = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await rolesServices.getRoles(payload)
    const { data, properties } = result.data
    setCount(properties.totalPages)
    setRoles(data)
    setIsLoading(false)
  }

  function editRole(params) {
    const id = params.id
    history.push(`${BASE_PATH}role/edit/${id}`)
  }

  function showRole(params) {
    const id = params.id
    history.push(`${BASE_PATH}role/show/${id}`)
  }

  async function deleteRole(params) {
    const deviceId = params.id
    const result = await service.deleteRole(deviceId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Rol silindi')
    } else {
      NotificationManager.error('Rol silinirken bir hata oluştu')
    }
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function filter(by, searchText) {
    switch (by) {
      case 'dataProtocol':
        console.log('----dataProtocol', searchText)
        break
      case 'dataProtocolVersion':
        console.log('----dataProtocolVersion', searchText)
        break
      default:
        break
    }
  }

  function goCreate() {
    history.push(`${BASE_PATH}role/create`)
  }

  return (
    <div className="roles-list">
      {isLoading ? (
        <CircularProgress className="roles-list-circular-progress" />
      ) : (
        <div className="roles-list-table-area">
          <div className="roles-list-table-area-header">
            <ButtonPermission permission="USER_CREATE" variant="outlined" startIcon={<Add />} size="small" onClick={goCreate}>
              Yeni Rol Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={roles}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="roles-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns,
                filter: filter
              }
            }}
          />
          <div className="roles-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default RolesList
