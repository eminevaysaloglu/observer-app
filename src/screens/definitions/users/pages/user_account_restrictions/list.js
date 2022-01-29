import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/user_account_restrictions/table_columns_data'
import userAccountRestrictionsServices from '../../service'
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { BASE_PATH } from '../../routes'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function UserAccountRestrictionsList() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userAccountRestrictions, setUserAccountRestrictions] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="UPDATER_USER_ACCOUNT_RESTRICTIONS_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editUserAccountRestrictions(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="UPDATER_USER_ACCOUNT_RESTRICTIONS_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteUserAccountRestrictions(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editUserAccountRestrictions(params) {
    const userAccountRestrictionsId = params.id
    history.push(`${BASE_PATH}user-account-restrictions/edit/${userAccountRestrictionsId}`)
  }

  async function deleteUserAccountRestrictions(params) {
    const userAccountRestrictionsId = params.id
    await service.deleteUserAccountRestriction(userAccountRestrictionsId)
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
    const result = await userAccountRestrictionsServices.getUserAccountResrictions(params)
    const { data, properties } = result.data
    setCount(properties.totalPages)
    setUserAccountRestrictions(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}user-account-restrictions/create`)
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
    <div className="user-account-restrictions-list">
      {isLoading ? (
        <CircularProgress className="user-account-restrictions-list-circular-progress" />
      ) : (
        <div className="user-account-restrictions-list-table-area">
          <div className="user-account-restrictions-list-table-area-header">
            <ButtonPermission
              permission="UPDATER_USER_ACCOUNT_RESTRICTIONS_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Kullanıcı Hesap Kısıtlama Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={userAccountRestrictions}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="user-account-restrictions-list-table-area-table"
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
          <div className="user-account-restrictions-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAccountRestrictionsList
