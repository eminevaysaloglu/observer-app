import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/team-authorities/table_columns_data'
import teamAuthoritiesServices from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import service from '../../service';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components';
import { NotificationManager } from 'react-notifications';

function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function TeamAuthorities() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [teamAuthorities, setTeamAuthorities] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <ButtonPermission permission="TE_TEAM_AUTHORITIES_UPDATE" grid  icon={<EditIcon />} onClick={() => editTeamAuthorities(params)} label="Edit"></ButtonPermission>,
                <ButtonPermission permission="TE_TEAM_AUTHORITIES_DELETE" grid 
                icon={<DeleteIcon />}
                onClick={() => deleteTeamAuthorities(params)}
                label="Delete"
                ></ButtonPermission>
            ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
            getData()
    }, [page, sortModel, location])

    function editTeamAuthorities(params) {
        const teamAuthorityId = params.id
        history.push(`/telematics/teams/team-authorities/edit/${teamAuthorityId}`)
    }

    async function deleteTeamAuthorities(params) {
        const teamAuthorityId = params.id
        const result = await service.deleteTeamAuthorities(teamAuthorityId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Takım yetkilisi silindi")
        } else {
            NotificationManager.error("Takım yetkilisi silinirken bir hata oluştu")
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
        const result = await teamAuthoritiesServices.getTeamAuthorities(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setTeamAuthorities(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/teams/team-authorities/create`)
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
      <div className="teams-authorities-list">
        {isLoading ? (
          <CircularProgress className="teams-authorities-list-circular-progress" />
        ) : (
          <div className="teams-authorities-list-table-area">
            <div className="teams-authorities-list-table-area-header">
              <ButtonPermission
                permission="TE_TEAM_AUTHORITIES_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Takım Yetkilisi Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={teamAuthorities}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="teams-authorities-list-table-area-table"
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
            <div className="teams-authorities-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default TeamAuthorities
