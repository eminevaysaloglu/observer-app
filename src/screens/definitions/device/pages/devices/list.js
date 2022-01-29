import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '../../constants/devices/table_columns_data'
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission, CustomInput } from 'components'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function Device() {
  const history = useHistory()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [devices, setDevices] = useState([])
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
      width: 150,
      notFilter: true,
      getActions: (params) => [
        <>
          <ButtonPermission permission="DEVICE_READ" grid icon={<InfoIcon />} onClick={() => showDevice(params)} label="Show" />
          <ButtonPermission
            permission="DEVICE_UPDATE"
            grid
            icon={<EditIcon />}
            onClick={() => editDevice(params)}
            label="Delete"
          ></ButtonPermission>
          <ButtonPermission
            permission="DEVICE_DELETE"
            grid
            icon={<DeleteIcon />}
            onClick={() => deleteDevice(params)}
            label="Delete"
          ></ButtonPermission>
        </>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editDevice(params) {
    const id = params.id
    history.push(`${BASE_PATH}device/edit/${id}`)
  }

  async function deleteDevice(params) {
    const deviceId = params.id
    const result = await service.deleteDevice(deviceId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Cihaz silindi')
    } else {
      NotificationManager.error('Cihaz silinirken bir hata oluştu')
    }
  }

  function showDevice(params) {
    const deviceId = params.id
    history.push(`${BASE_PATH}device/show/${deviceId}`)
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
    const result = await service.getDevicesWithFilterData(params)
    const data = result?.data?.data || []
    const properties = result?.data?.properties || {}
    setCount(properties.totalPages)
    setDevices(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}device/create`)
  }

  return (
    <div className="device-list">
      {isLoading ? (
        <CircularProgress className="device-list-circular-progress" />
      ) : (
        <div className="device-list-table-area">
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
              <ButtonPermission permission="DEVICE_CREATE" variant="outlined" startIcon={<Add />} size="small" onClick={goCreate}>
                Yeni Cihaz Ekle
              </ButtonPermission>
            </div>
          </div>

          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
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
                value: columns
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

export default Device
