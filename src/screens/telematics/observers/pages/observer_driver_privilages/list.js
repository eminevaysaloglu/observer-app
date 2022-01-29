import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/observer_driver_privilages/table_columns_data'
import observerDrivePrivilageService from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components'
import { NotificationManager } from 'react-notifications';

function Header() {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function ObserverDriverPrivilages() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [observerDrivers, setObserverDrivers] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
            <ButtonPermission
              permission="TE_OBSERVER_DRIVER_ACCESS_PRIVILEGES_UPDATE"
              grid
              icon={<EditIcon />}
              onClick={() => editObserverDriverPrivilage(params)}
              label="Edit"
            ></ButtonPermission>,
            <ButtonPermission
              permission="TE_OBSERVER_DRIVER_ACCESS_PRIVILEGES_DELETE"
              grid
              icon={<DeleteIcon />}
              onClick={() => deleteObserverDriverPrivilage(params)}
              label="Delete"
            ></ButtonPermission>
            ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editObserverDriverPrivilage(params) {
        const observerDriverPrivilageId = params.id
        history.push(`/telematics/observers/observer-driver-privilage/edit/${observerDriverPrivilageId}`)
    }

    async function deleteObserverDriverPrivilage(params) {
        const observerDriverPrivilageId = params.id
        const result = await observerDrivePrivilageService.deleteObserverVehicleAccessPrivilege(observerDriverPrivilageId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Gözlemci Sürücü Erişimi silindi")
        } else {
            NotificationManager.error("Gözlemci Sürücü Erişimi silinirken bir hata oluştu")
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
        const result = await observerDrivePrivilageService.getObserverDriverAccessPrivileges(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setObserverDrivers(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/observers/observer-driver-privilage/create`)
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
      <div className="observer-drivers-list">
        {isLoading ? (
          <CircularProgress className="observer-drivers-list-circular-progress" />
        ) : (
          <div className="observer-drivers-list-table-area">
            <div className="observer-drivers-list-table-area-header">
              <ButtonPermission
                permission="TE_OBSERVER_DRIVER_ACCESS_PRIVILEGES_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Gözlemci Sürücü İlişkisi Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={observerDrivers}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="observer-drivers-list-table-area-table"
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
            <div className="observer-drivers-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default ObserverDriverPrivilages
