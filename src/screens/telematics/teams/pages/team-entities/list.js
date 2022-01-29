import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/team-entities/table_columns_data'
import teamEntitiesServices from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import service from '../../service';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { NotificationManager } from 'react-notifications';

function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function TeamEntities() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [teamEntities, setTeamEntities] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <ButtonPermission permission="TE_TEAM_ENTITIES_UPDATE" grid  icon={<EditIcon />} onClick={() => editTeamEntities(params)} label="Edit"></ButtonPermission>,
                <ButtonPermission permission="TE_TEAM_ENTITIES_DELETE" grid 
                icon={<DeleteIcon />}
                onClick={() => deleteTeamEntities(params)}
                label="Delete"
                ></ButtonPermission>
            ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
            getData()
    }, [page, sortModel, location])

    function editTeamEntities(params) {
        const teamEntityId = params.id
        history.push(`/telematics/teams/team-entities/edit/${teamEntityId}`)
    }

    async function deleteTeamEntities(params) {
        const teamEntityId = params.id
        const result = await service.deleteTeamEntities(teamEntityId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Silindi")
        } else {
            NotificationManager.error("Silinirken bir hata oluştu")
        }
    }

    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: "createdAt", sort: "desc" }
        const params = {
            size: 10,
            page: page,
            sort: `${field},${sort}`
        }
        const result = await teamEntitiesServices.getTeamEntities(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setTeamEntities(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/teams/team-entities/create`)
    }

    function filter(by, searchText) {
        switch (by) {
            case "dataProtocol":
                console.log("----dataProtocol", searchText);
                break;
            case "dataProtocolVersion":
                console.log("----dataProtocolVersion", searchText);
                break
            default:
                break;
        }
    }

    return (
      <div className="team-entities-list">
        {isLoading ? (
          <CircularProgress className="team-entities-list-circular-progress" />
        ) : (
          <div className="team-entities-list-table-area">
            <div className="team-entities-list-table-area-header">
              <ButtonPermission
                permission="TE_TEAM_ENTITIES_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Varlık Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={teamEntities}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="team-entities-list-table-area-table"
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
            <div className="team-entities-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default TeamEntities
