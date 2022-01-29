import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { columns } from '../../constants/teams/table_columns_data'
import teamsServices from '../../service'
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import service from '../../service'
import Add from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'
import InfoIcon from '@mui/icons-material/Info'

function Header(props) {
  return (
    <div className="table-header">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  )
}

function Teams() {
  const history = useHistory()
  const match = useRouteMatch()
  const url = match.url
  const location = useLocation()
  const [sortModel, setSortModel] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [teams, setTeams] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const column = {
      field: 'actions',
      headerName: 'Aksiyonlar',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <>
          <ButtonPermission permission="TE_TEAMS_READ" grid icon={<InfoIcon />} onClick={() => showTeams(params)} label="Show" />
          <ButtonPermission
            permission="TE_TEAMS_UPDATE"
            grid
            icon={<EditIcon />}
            onClick={() => editTeams(params)}
            label="Delete"
          ></ButtonPermission>
          <ButtonPermission
            permission="TE_TEAMS_DELETE"
            grid
            icon={<DeleteIcon />}
            onClick={() => deleteTeams(params)}
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

  function showTeams(params) {
    const teamId = params.id
    history.push(`/telematics/teams/team/show/${teamId}`)
  }
  function editTeams(params) {
    const teamId = params.id
    history.push(`/telematics/teams/team/edit/${teamId}`)
  }

  async function deleteTeams(params) {
    const teamId = params.id
    const result = await service.deleteTeams(teamId)
    if (result?.status === 200) {
      getData()
      NotificationManager.success('Takım silindi')
    } else {
      NotificationManager.error('Takım silinirken bir hata oluştu')
    }
  }

  async function getData() {
    setIsLoading(true)
    const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
    const params = {
      size: 10,
      page: page,
      sort: `${field},${sort}`
    }
    const result = await teamsServices.getTeams(params)
    const data = result?.data?.data
    const properties = result?.data?.properties
    setCount(properties.totalPages)
    setTeams(data)
    setIsLoading(false)
  }

  function paginationChange(_, e_page) {
    setPage(e_page - 1)
  }

  function goCreate() {
    history.push(`/telematics/teams/team/create`)
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
    <div className="teams-list">
      {isLoading ? (
        <CircularProgress className="teams-list-circular-progress" />
      ) : (
        <div className="teams-list-table-area">
          <div className="teams-list-table-area-header">
            <ButtonPermission permission="TE_TEAMS_CREATE" variant="outlined" startIcon={<Add />} size="small" onClick={goCreate}>
              Yeni Takım Ekle
            </ButtonPermission>
          </div>

          <DataGrid
            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
            rows={teams}
            columns={columns}
            rowHeight={35}
            headerHeight={35}
            autoHeight
            hideFooter
            showColumnRightBorder
            sortingMode="server"
            className="teams-list-table-area-table"
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
          <div className="teams-list-table-area-pagination">
            <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Teams
