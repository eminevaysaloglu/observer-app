import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/users/table_columns_data'
import service from '../../service'
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, CustomInput, ButtonPermission } from 'components'
import { BASE_PATH } from '../../routes'

function Users() {
  const history = useHistory()
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
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
        filterBy: 'id'
      }
    )

  const [filterData, setFilterData] = useState(defaultFilterData)

  async function filter() {
    setPage(0)
    getData()
  }

  function showUser(params) {
    const usersId = params.id
    history.push(`${BASE_PATH}user/show/${usersId}`)
  }

  function editUser(params) {
    const usersId = params.id
    history.push(`${BASE_PATH}user/edit/${usersId}`)
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'user_id', sort: 'desc' }
    const { filterBy, ...otherParams } = filterData
    const payload = {
      ...otherParams,
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await service.getUsersWithFilter(payload)
    const data = result?.data?.data || []
    const properties = result?.data?.properties
    setCount(properties?.totalPages)
    setUsers(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}user/create`)
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
          <ButtonPermission permission="USER_READ" grid icon={<InfoIcon />} onClick={() => showUser(params)} label="Show" />
          <ButtonPermission permission="USER_UPDATE" grid icon={<EditIcon />} onClick={() => editUser(params)} label="Edit" />
        </>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  return (
    <div className="users-list">
      {isLoading ? (
        <CircularProgress className="users-list-circular-progress" />
      ) : (
        <div className="users-list-table-area">
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
                permission="USER_CREATE"
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
                onClick={goCreate}
              >
                KULLANICI EKLE
              </ButtonPermission>
            </div>
          </div>
          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={users}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="users-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns
              }
            }}
          />
          <div className="users-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
