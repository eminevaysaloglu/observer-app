import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/vehicles/table_columns_data'
import vehicleServices from '../../service'
import { Pagination, CircularProgress, TextField, Button } from '@mui/material'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'

import './style.scss'
import service from '../../service'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission, CustomInput } from 'components'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function Vehicle() {
  const history = useHistory()
  const refdatagrid = useRef()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [count, setCount] = useState(0)
  const defaultFilterData = columns
    .filter((e) => !e.notFilter)
    .reduce(
      (accumulator, item) => {
        const newAccumulator = { ...accumulator }
        newAccumulator[item.field] = ''
        return newAccumulator
      },
      {
        filterBy: 'id',
        status: 'ACTIVE'
      }
    )

  const [filterData, setFilterData] = useState(defaultFilterData)

  async function filter() {
    setPage(0)
    getData()
  }

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      notFilter: true,
      width: 150,
      getActions: (params) => [
        <ButtonPermission permission="VEHICLE_READ" grid icon={<InfoIcon />} onClick={() => showVehicle(params)} label="Show" />,
        <ButtonPermission
          permission="VEHICLE_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editVehicle(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="VEHICLE_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteVehicle(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function showVehicle(params) {
    const id = params.id
    history.push(`${BASE_PATH}vehicle/show/${id}`)
  }

  function editVehicle(params) {
    const id = params.id
    history.push(`${BASE_PATH}vehicle/edit/${id}`)
  }

  async function deleteVehicle(params) {
    const vehicleId = params.id
    const result = await service.deleteVehicle(vehicleId)
    if (result?.status === 200) {
      NotificationManager.success('Araç başarılı bir şekilde silindi')
    } else {
      NotificationManager.error('Araç silinirken bir hatayla karşılaşıldı')
    }
    getData()
  }

  function goCreate() {
    history.push(`${BASE_PATH}vehicle/create`)
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const { filterBy, ...otherParams } = filterData
    const params = {
      ...otherParams,
      pageSize: 10,
      pageNumber: page
      /* sort: `${field},${sort}` */
    }
    const result = await vehicleServices.getVehiclesWithFilter(params)
    const data = result?.data?.data
    setCount(result?.data?.properties?.totalPages)
    setVehicles(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  return (
    <div className="vehicle-list">
      {isLoading ? (
        <CircularProgress className="vehicle-list-circular-progress" />
      ) : (
        <div className="vehicle-list-table-area">
          <div className="mx-2 my-5 flex justify-between items-center">
            <div className="flex ">
              <CustomInput
                label="Tipi"
                size="small"
                value={filterData.filterBy}
                items={columns
                  .filter((e) => !e.notFilter)
                  .map((e) => {
                    return {
                      text: e.headerName,
                      value: e.field
                    }
                  })}
                onChange={(event, newValue) => {
                  setFilterData({ ...defaultFilterData, filterBy: newValue })
                }}
                type="select"
              />
              <CustomInput
                type="text"
                size="small"
                label="Arama Yap"
                variant="outlined"
                value={filterData[filterData.filterBy]}
                onChange={(event, newValue) => {
                  const newFilterData = { ...filterData }
                  newFilterData[filterData.filterBy] = newValue
                  setFilterData(newFilterData)
                }}
              />
              <Button onClick={filter} variant="contained" size="small">
                Ara
              </Button>
            </div>
            <div className="flex">
              <ButtonPermission
                permission="VEHICLE_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Araç Ekle
              </ButtonPermission>
            </div>
          </div>
          <DataGrid
            ref={refdatagrid}
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={vehicles}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="vehicle-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns
              }
            }}
          />
          <div className="vehicle-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Vehicle
