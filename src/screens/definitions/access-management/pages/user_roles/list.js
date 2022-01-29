import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import { columns } from '../../constants/user_roles/table_columns_data'
import services from '../../service'
import { Pagination, CircularProgress, Button } from '@mui/material'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, CustomInput } from 'components'
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function UserRoles() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userRoles, setUserRoles] = useState([])
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
    getData()
  }, [page, sortModel, location])

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={() => editUserRoles(params)} label="Delete"></GridActionsCellItem>,
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteUserRoles(params)} label="Delete"></GridActionsCellItem>
      ]
    }
    columns.unshift(column)
  }, [])

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
    const result = await services.getUserRolesWithFilterDate(params)
    const data = result?.data?.data || []
    const properties = result?.data?.properties || {}
    setCount(properties.totalPages)
    setUserRoles(data)
    setIsLoading(false)
  }

  function editUserRoles(params) {
    const id = params.id
    history.push(`${BASE_PATH}user-role/edit/${id}`)
  }

  async function deleteUserRoles(params) {
    const userRoleId = params.id
    const result = await services.deleteUserRole(userRoleId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Kullanıcı Rol İlişkisi silindi')
    } else {
      NotificationManager.error('Kullanıcı Rol İlişkisi silinirken bir hata oluştu')
    }
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}user-role/create`)
  }

  return (
    <div className="user-roles-list">
      {isLoading ? (
        <CircularProgress className="user-roles-list-circular-progress" />
      ) : (
        <div className="user-roles-list-table-area">
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
              <Button variant="outlined" startIcon={<Add />} size="small" onClick={goCreate}>
                Yeni Kullanıcı Rol İlişkisi Ekle
              </Button>
            </div>
          </div>

          <DataGrid
            components={{ NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={userRoles}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="user-roles-list-table-area-table"
            disableColumnMenu
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            componentsProps={{
              filterPanel: {
                value: columns
              }
            }}
          />
          <div className="user-roles-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRoles
