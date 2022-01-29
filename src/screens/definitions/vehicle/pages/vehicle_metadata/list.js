import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import {
  DataGrid,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { columns } from '../../constants/vehicle_metadata/table_columns_data'
import vehicleServices from '../../service'
import { Pagination, CircularProgress } from '@mui/material'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './style.scss'
import service from '../../service'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
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

function VehicleMetadataList() {
  const history = useHistory()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="VEHICLE_METADATA_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editVehicleMetadata(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="VEHICLE_METADATA_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteVehicleMetadata(params)}
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
        const data = await vehicleServices.findByPlateVehicleMetadata({ plate: searchText })
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

  function editVehicleMetadata(params) {
    const id = params.id
    history.push(`${BASE_PATH}vehicle-metadata/edit/${id}`)
  }

  async function deleteVehicleMetadata(params) {
    const vehicleMetadataId = params.id
    const result = await service.deleteVehicleMetadata(vehicleMetadataId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Araç altbilgisi silindi')
    } else {
      NotificationManager.error('Araç altbilgisi silinirken bir hata oluştu')
    }
  }

  function goCreate() {
    history.push(`${BASE_PATH}vehicle-metadata/create`)
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const payload = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await vehicleServices.getVehiclesMetadata(payload)
    const data = result?.data?.data
const properties = result?.data?.properties
    setCount(properties.totalPages)
    setVehicles(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  return (
    <div className="vehicle-metadata-list">
      {isLoading ? (
        <CircularProgress className="vehicle-metadata-list-circular-progress" />
      ) : (
        <div className="vehicle-metadata-list-table-area">
          <div className="vehicle-metadata-list-table-area-header">
            <ButtonPermission
              permission="VEHICLE_METADATA_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Araç Altbilgisi Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={vehicles}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="vehicle-metadata-list-table-area-table"
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
          <div className="vehicle-metadata-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleMetadataList
