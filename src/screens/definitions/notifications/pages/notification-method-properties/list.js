import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/notification-method-properties/table_columns_data'
import notificationMethodPropertiesServices from '../../service'
import { Pagination, CircularProgress } from '@mui/material'
import '../../style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function NotificationMethodProperties() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [notificationMethodProperties, setNotificationMethodProperties] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="NOTIFICATION_METHODS_PROPERTIES_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editNotificationMethodProperties(params)}
          label="Edit"
        ></ButtonPermission>,
        <ButtonPermission
          permission="NOTIFICATION_METHODS_PROPERTIES_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteNotificationMethodProperties(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editNotificationMethodProperties(params) {
    const id = params.id
    history.push(`${BASE_PATH}notification-method-property/edit/${id}`)
  }

  async function deleteNotificationMethodProperties(params) {
    const notificationMethodPropertyId = params.id
    const result = await service.deleteNotificationMethodProperties(notificationMethodPropertyId)
    if (result.status === 200) {
      NotificationManager.success('Bildirim yöntem özelliği başarılı bir şekilde silindi')
    } else {
      NotificationManager.error('Bildirim yöntem özelliği silinken bir hata ile karşılaşıldı')
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
    const result = await notificationMethodPropertiesServices.getNotificationMethodProperties(params)
    const { data, properties } = result.data
    setCount(properties.totalPages)
    setNotificationMethodProperties(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}notification-method-property/create/`)
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
    <div className="notifications-list">
      {isLoading ? (
        <CircularProgress className="notifications-list-circular-progress" />
      ) : (
        <div className="notifications-list-table-area">
          <div className="notifications-list-table-area-header">
            <ButtonPermission
              permission="NOTIFICATION_METHOD_PROPERTIES_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Bildirim Yöntemi Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={notificationMethodProperties}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="notifications-list-table-area-table"
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
          <div className="notifications-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationMethodProperties
