import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { columns } from '../../constants/user_addresses/table_columns_data'
import userAddressesServices from '../../service'
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { BASE_PATH } from '../../routes'
import { NotificationManager } from 'react-notifications'
import './style.scss'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function UserAddressesList() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userAddresses, setUserAddresses] = useState([])
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="USER_ADDRESSES_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editUserAddresses(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="USER_ADDRESSES_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteUserAddresses(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editUserAddresses(params) {
    const userAddressesId = params.id
    history.push(`${BASE_PATH}user-address/edit/${userAddressesId}`)
  }

  async function deleteUserAddresses(params) {
    const userAddressesId = params.id
    await service.deleteUserAddresses(userAddressesId)
    getData()
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const params = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const paramsUsers = {
      size: 999999,
      page: 0
    }
    const usersResult = await userAddressesServices.getUsers(paramsUsers)
    const result = await userAddressesServices.getUserAddresses(params)
    const { data, properties } = result.data
    const users = usersResult?.data?.data

    setUsers(users)
    setCount(properties.totalPages)
    setUserAddresses(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}user-address/create`)
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

  return (
    <div className="user-addresses-list">
      {isLoading ? (
        <CircularProgress className="user-addresses-list-circular-progress" />
      ) : (
        <div className="user-addresses-list-table-area">
          <div className="user-addresses-list-table-area-header">
            <ButtonPermission
              permission="USER_ADDRESSES_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Kullanıcı Adresi Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={userAddresses}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="user-addresses-list-table-area-table"
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
          <div className="user-addresses-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAddressesList
