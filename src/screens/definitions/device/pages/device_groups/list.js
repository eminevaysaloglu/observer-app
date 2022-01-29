import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/device_groups/table_columns_data'
import devicesServices from '../../service' //??
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service' //UNUTMA!!
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function Header() {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function DeviceGroupsList() {
  const history = useHistory()
  const { url } = useRouteMatch()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [deviceGroups, setDeviceGroups] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission permission="DEVICE_GROUPS_UPDATE" grid  icon={<EditIcon />} onClick={() => editDeviceGroups(params)} label="Edit"></ButtonPermission>,
        <ButtonPermission permission="DEVICE_GROUPS_DELETE" grid 
          icon={<DeleteIcon />}
          onClick={() => deleteDeviceGroups(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editDeviceGroups(params) {
    const id = params.id
    history.push(`${BASE_PATH}device-group/edit/${id}`)
  }

  async function deleteDeviceGroups(params) {
    const deviceGroupId = params.id
    const result = await service.deleteDeviceGroups(deviceGroupId)
    if (result.status === 200) {
      NotificationManager.success('Cihaz grubu başarılı bir şekilde silindi')
    } else {
      NotificationManager.error('Cihaz grubu silinken bir hata ile karşılaşıldı')
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
    const result = await devicesServices.getDeviceGroups(params)
    const data = result?.data?.data
const properties = result?.data?.properties
    setCount(properties.totalPages)
    setDeviceGroups(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}device-group/create`)
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
    <div className="device-groups-list">
      {isLoading ? (
        <CircularProgress className="device-groups-list-circular-progress" />
      ) : (
        <div className="device-groups-list-table-area">
          <div className="device-groups-list-table-area-header">
            <ButtonPermission
              permission="DEVICE_GROUP_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Cihaz Grubu Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={deviceGroups}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="device-groups-list-table-area-table"
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
          <div className="device-groups-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default DeviceGroupsList
