import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import devicesServices from '../../service'
import { Pagination, CircularProgress, Button } from '@mui/material'
import './style.scss'
import { CustomNoRowsOverlay } from 'components'
import { NotificationManager } from 'react-notifications'
import { columns } from '../../constants/vehicle-reports/table_columns_data'
import FilterDrawer from './components/FilterDrawer'
import { toIsoString } from 'utils/locale'
function VehicleReport() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [devices, setDevices] = useState([])
  const [count, setCount] = useState(0)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [filterData, setFilterData] = useState({
    vehicleId: '',
    startDate: '',
    endDate: '',
    type: 'ON'
  })


  function handleFilter(data) {
    const sendFormData = {
      deviceId: data.vehicleDevice?.device?.id,
      beginDate: data.startDate ? toIsoString(new Date(data.startDate)) : null,
      endDate: data.endDate ? toIsoString(new Date(data.endDate)) : null,
      type: data.type
    }
    setFilterData(sendFormData)
  }

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const params = {
      size: 10,
      page: page,
      ...filterData
    }
    const result = await devicesServices.getVehicleIgnationEvents(params)
    const data = result?.data?.data || []
    const properties = result?.data?.properties || {}

    setCount(properties.totalPages)
    setDevices(data)
    setIsLoading(false)
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

  return (
    <div className="device-list">
      <FilterDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleFilter={(e) => handleFilter(e)}
        filterData={filterData}
      />
      {isLoading ? (
        <CircularProgress className="device-list-circular-progress" />
      ) : (
        <div className="device-list-table-area">
          <div className="table-header">
            <Button variant="contained" size="small" onClick={() => setOpenDrawer(true)}>
              Filtrele
            </Button>
          </div>
          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay }}
            rows={devices}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="device-list-table-area-table"
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
          <div className="device-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleReport
