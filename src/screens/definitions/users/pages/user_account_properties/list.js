import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/user_account_properties/table_columns_data'
import userAccountPropertiesServices from '../../service'
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { BASE_PATH } from '../../routes'
import { NotificationManager } from 'react-notifications'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function UserAccountPropertiesList() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userAccountProperties, setUserAccountProperties] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="USER_ACCOUNT_PROPERTIES_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editUserAccountProperties(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="USER_ACCOUNT_PROPERTIES_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteUserAccountProperties(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editUserAccountProperties(params) {
    const userAccountPropertyId = params.id
    history.push(`${BASE_PATH}user-account-properties/edit/${userAccountPropertyId}`)
  }

  async function deleteUserAccountProperties(params) {
    const userAccountPropertiesId = params.id
    const result = await userAccountPropertiesServices.deleteUserAccountProperty(userAccountPropertiesId)
    if (result?.status === 200) {
      NotificationManager.success('Kullanıcı hesap özelliği başarılı bir şekilde silindi')
    } else {
      NotificationManager.else('Kullanıcı hesap özelliği silinirken bir hata oluştu')
    }
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
    const result = await userAccountPropertiesServices.getUserAccountProperties(params)
    const { data, properties } = result.data
    setCount(properties.totalPages)
    setUserAccountProperties(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}user-account-properties/create`)
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
    <div className="user-account-properties-list">
      {isLoading ? (
        <CircularProgress className="user-account-properties-list-circular-progress" />
      ) : (
        <div className="user-account-properties-list-table-area">
          <div className="user-account-properties-list-table-area-header">
            <ButtonPermission
              permission="USER_ACCOUNT_PROPERTIES_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              KULLANICI HESAP ÖZELLİĞİ EKLE
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={userAccountProperties}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="user-account-properties-list-table-area-table"
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
          <div className="user-account-properties-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAccountPropertiesList
