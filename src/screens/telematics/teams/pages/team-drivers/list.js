import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/team-drivers/table_columns_data'
import teamDriversServices from '../../service';
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

function TeamDrivers() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [teamDrivers, setTeamDrivers] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <ButtonPermission permission="TE_TEAM_DRIVERS_UPDATE" grid  icon={<EditIcon />} onClick={() => editTeamDrivers(params)} label="Edit"></ButtonPermission>,
                <ButtonPermission permission="TE_TEAM_DRIVERS_DELETE" grid 
                icon={<DeleteIcon />}
                onClick={() => deleteTeamDrivers(params)}
                label="Delete"
                ></ButtonPermission>
            ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
            getData()
    }, [page, sortModel, location])

    function editTeamDrivers(params) {
        const teamDriverId = params.id
        history.push(`/telematics/teams/team-drivers/edit/${teamDriverId}`)
    }

    async function deleteTeamDrivers(params) {
        const teamDriverId = params.id
        const result = await service.deleteTeamDrivers(teamDriverId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Takım sürücüsü silindi")
        } else {
            NotificationManager.error("Takım sürücüsü silinirken bir hata oluştu")
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
        const result = await teamDriversServices.getTeamDrivers(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setTeamDrivers(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/teams/team-drivers/create`)
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
      <div className="team-drivers-list">
        {isLoading ? (
          <CircularProgress className="team-drivers-list-circular-progress" />
        ) : (
          <div className="team-drivers-list-table-area">
            <div className="team-drivers-list-table-area-header">
              <ButtonPermission
                permission="TE_TEAM_DRIVERS_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Takım Sürücüsü Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={teamDrivers}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="team-drivers-list-table-area-table"
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
            <div className="team-drivers-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default TeamDrivers
