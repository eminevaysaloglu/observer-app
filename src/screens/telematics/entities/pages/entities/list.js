import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '../../constants/entities/table_columns_data'
import entitiesServer from '../../service'
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, CustomInput, ButtonPermission } from 'components'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'
import DeleteIcon from '@mui/icons-material/Delete'

function Entities() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [entities, setEntities] = useState([])
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
        <ButtonPermission
          permission="TE_ENTITIES_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editEntity(params)}
          label="Edit"
        ></ButtonPermission>,
        <ButtonPermission
          permission="TE_ENTITIES_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteEntity(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editEntity(params) {
    const entityId = params.id
    history.push(`${BASE_PATH}entity/edit/${entityId}`)
  }

  async function deleteEntity(params) {
    const entityId = params.id
    const result = await entitiesServer.deleteEntity(entityId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Varlık silindi')
    } else {
      NotificationManager.error('Varlık silinirken bir hata oluştu')
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
    const result = await entitiesServer.getEntitiesWithFilterData(params)
    const data = result?.data?.data
    const properties = result?.data?.properties
    setCount(properties.totalPages)
    setEntities(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}entity/create`)
  }

  return (
    <div className="entities-list">
      {isLoading ? (
        <CircularProgress className="entities-list-circular-progress" />
      ) : (
        <div className="entities-list-table-area">
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
                permission="TE_ENTITIES_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Varlık Ekle
              </ButtonPermission>
            </div>
          </div>

          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={entities}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="entities-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns
              }
            }}
          />
          <div className="entities-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Entities
