import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { columns } from '../../constants/user_metadata/table_columns_data'
import userMetadataServices from '../../service'
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { BASE_PATH } from '../../routes'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function UserMetadataList() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userMetadata, setUserMetadata] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <ButtonPermission
          permission="USER_METADATA_UPDATE"
          grid
          icon={<EditIcon />}
          onClick={() => editUserMetadata(params)}
          label="Delete"
        ></ButtonPermission>,
        <ButtonPermission
          permission="USER_METADATA_DELETE"
          grid
          icon={<DeleteIcon />}
          onClick={() => deleteUserMetadata(params)}
          label="Delete"
        ></ButtonPermission>
      ]
    }
    columns.unshift(column)
  }, [])

  useEffect(() => {
    getData()
  }, [page, sortModel, location])

  function editUserMetadata(params) {
    const userMetadataId = params.id
    history.push(`${BASE_PATH}user-metadata/edit/${userMetadataId}`)
  }

  async function deleteUserMetadata(params) {
    const userMetadataId = params.id
    await service.deleteUserMetadata(userMetadataId)
    getData()
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const payload = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await userMetadataServices.getUserMetaDatas(payload)
    const { data, properties } = result.data
    setCount(properties.totalPages)
    setUserMetadata(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`${BASE_PATH}user-metadata/create`)
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
    <div className="user-metadata-list">
      {isLoading ? (
        <CircularProgress className="user-metadata-list-circular-progress" />
      ) : (
        <div className="user-metadata-list-table-area">
          <div className="user-metadata-list-table-area-header">
            <ButtonPermission
              permission="USER_METADATA_CREATE"
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={goCreate}
            >
              KULLANICI ALTBİLGİSİ EKLE
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={userMetadata}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="user-metadata-list-table-area-table"
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
          <div className="user-metadata-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMetadataList
