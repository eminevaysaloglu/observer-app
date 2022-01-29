import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '../../constants/observers/table_columns_data'
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, CustomInput, ButtonPermission } from 'components'
import { NotificationManager } from 'react-notifications'

function Observers() {
  const history = useHistory()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [observers, setObservers] = useState([])
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
        filterBy: 'userId'
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
          permission="TE_OBSERVERS_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editObservers(params)}
          label="Edit"
        ></ButtonPermission>,
        <ButtonPermission
          permission="TE_OBSERVERS_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteObservers(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editObservers(params) {
    const observerId = params.id
    history.push(`/telematics/observers/observer/edit/${observerId}`)
  }

  async function deleteObservers(params) {
    const observerId = params.id
    const result = await service.deleteObserver(observerId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Gözlemci silindi')
    } else {
      NotificationManager.error('Gözlemci silinirken bir hata oluştu')
    }
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
    const result = await service.getObserversWithFilter(params)
    const data = result?.data?.data || []
    const properties = result?.data?.properties || {}
    setCount(properties.totalPages)
    setObservers(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`/telematics/observers/observer/create`)
  }

  return (
    <div className="observers-list">
      {isLoading ? (
        <CircularProgress className="observers-list-circular-progress" />
      ) : (
        <div className="observers-list-table-area">
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
                permission="TE_OBSERVERS_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Gözlemci Ekle
              </ButtonPermission>
            </div>
          </div>

          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={observers}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="observers-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns
              }
            }}
          />
          <div className="observers-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Observers
