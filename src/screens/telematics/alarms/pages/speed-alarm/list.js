import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '../../constants/speed-alarm/table_columns_data'
import service from '../../service'
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, CustomInput, ButtonPermission } from 'components'
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function SpeedAlarms() {
  const history = useHistory()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [speedAlarms, setSpeedAlarms] = useState([])
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
        filterBy: 'name',
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
        <ButtonPermission
          permission="TE_SPEED_ALARMS_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editSpeedAlarms(params)}
          label="Edit"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editSpeedAlarms(params) {
    const id = params.id
    history.push(`${BASE_PATH}speed-alarm/edit/${id}`)
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const { filterBy, ...otherParams } = filterData
    const params = {
      /* ...otherParams, */
      pageSize: 10,
      pageNumber: page,
      sort: `${field},${sort}`
    }
    const result = await service.getSpeedAlarms(params)
    //const result = await service.getSpeedAlarmsWithFilter(params)
    const data = result?.data?.data || []
    const properties = result?.data?.properties || {}
    setCount(properties.totalPages)
    setSpeedAlarms(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}speed-alarm/create/`)
  }

  return (
    <div className="speed-alarms-list">
      {isLoading ? (
        <CircularProgress className="speed-alarms-list-circular-progress" />
      ) : (
        <div className="speed-alarms-list-table-area">
          {/* <div className="mx-2 my-5 flex justify-between items-center">
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
                permission="TE_SPEED_ALARMS_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Hız Alarmı Ekle
              </ButtonPermission>
            </div>
          </div> */}

          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={speedAlarms}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="speed-alarms-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns
              }
            }}
          />
          <div className="speed-alarms-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default SpeedAlarms
