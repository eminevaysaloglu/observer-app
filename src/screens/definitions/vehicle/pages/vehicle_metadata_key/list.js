import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/vehicle_metadata_key/table_columns_data'
import vehicleMetadataKeyServices from '../../service'
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
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

function VehicleMetadataKeyList() {
  const history = useHistory()
  const { url } = useRouteMatch()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleMetadataKeys, setVehicleMetadataKeys] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="VEHICLE_METADATA_KEY_DELETE"
          grid
          icon={<EditIcon />}
          onClick={() => editVehicleMetadataKey(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="VEHICLE_METADATA_KEY_UPDATE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteVehicleMetadataKey(params)}
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

  function editVehicleMetadataKey(params) {
    const id = params.id
    history.push(`${BASE_PATH}vehicle-metadata-key/edit/${id}`)
  }

  async function deleteVehicleMetadataKey(params) {
    const vehicleMetadataKeyId = params.id
    const result = await service.deleteVehicleMetadataKey(vehicleMetadataKeyId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Araç altbilgi key silindi')
    } else {
      NotificationManager.error('Araç altbilgi key silinirken bir hata oluştu')
    }
  }

  function goCreate() {
    history.push(`${BASE_PATH}vehicle-metadata-key/create`)
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const payload = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await vehicleMetadataKeyServices.getVehicleMetadataKeys(payload)
    const data = result?.data?.data
const properties = result?.data?.properties
    setCount(properties.totalPages)
    setVehicleMetadataKeys(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  return (
    <div className="vehicle-metadata-key-list">
      {isLoading ? (
        <CircularProgress className="vehicle-metadata-key-list-circular-progress" />
      ) : (
        <div className="vehicle-metadata-key-list-table-area">
          <div className="vehicle-metadata-key-list-table-area-header">
            <ButtonPermission
              permission="VEHICLE_METADATA_KEY_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              Yeni Araç Altbilgi Key Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={vehicleMetadataKeys}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="vehicle-metadata-key-list-table-area-table"
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
          <div className="vehicle-metadata-key-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleMetadataKeyList
