import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { columns } from '../../constants/vehicle_groups/table_columns_data'
import { Pagination, CircularProgress, Button } from '@mui/material'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import vehicleServices from '../../service'
import './style.scss'
import service from '../../service'
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

function VehicleGroupsList() {
  const history = useHistory()
  const { url } = useRouteMatch()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleGroups, setVehiclesGroups] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="VEHICLE_GROUPS_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editVehicleGroups(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="VEHICLE_GROUPS_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteVehicleGroups(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  async function filter(by, searchText) {
    switch (by) {
      case 'plate':
        const data = await service.findByPlateVehicle({ plate: searchText })
        const vehicle = data?.data
        console.log('----plate', vehicle)
        break
      case 'dataProtocolVersion':
        console.log('----dataProtocolVersion')
        break
      default:
        break
    }
  }

  function editVehicleGroups(params) {
    const id = params.id
    history.push(`${BASE_PATH}vehicle-group/edit/${id}`)
  }

  async function deleteVehicleGroups(params) {
    const vehicleGroupId = params.id
    await service.deleteVehicleGroups(vehicleGroupId)
    if (result.status === 200) {
      NotificationManager.success('Araç grubu başarılı bir şekilde silindi')
    } else {
      NotificationManager.error('Araç grubu silinken bir hata ile karşılaşıldı')
    }
    getData()
  }

  function goCreate() {
    history.push(`${BASE_PATH}vehicle-group/create`)
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const params = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await vehicleServices.getVehicleGroups(params)
    const data = result?.data?.data
const properties = result?.data?.properties
    setCount(properties.totalPages)
    setVehiclesGroups(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  return (
    <div className="vehicle-groups-list">
      {isLoading ? (
        <CircularProgress className="vehicle-groups-list-circular-progress" />
      ) : (
        <div className="vehicle-groups-list-table-area">
          <div className="vehicle-groups-list-table-area-header">
            <ButtonPermission
              permission="VEHICLE_GROUPS_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Araç Grup Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={vehicleGroups}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="vehicle-groups-list-table-area-table"
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
          <div className="vehicle-groups-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleGroupsList
