import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/observer_vehicle_privilages/table_columns_data'
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

function ObserverVehiclePrivilages() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [observerVehicles, setObserverVehicles] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
          field: 'actions',
          headerName: 'Aksiyonlar',
          type: 'actions',
          width: 150,
          getActions: (params) => [
            <ButtonPermission
              permission="TE_OBSERVER_VEHICLE_ACCESS_PRIVILEGES_UPDATE"
              grid
              icon={<EditIcon />}
              onClick={() => editObserverVehiclePrivilage(params)}
              label="Edit"
            ></ButtonPermission>,
            <ButtonPermission
              permission="TE_OBSERVER_VEHICLE_ACCESS_PRIVILEGES_DELETE"
              grid
              icon={<DeleteIcon />}
              onClick={() => deleteObserverVehiclePrivilage(params)}
              label="Delete"
            ></ButtonPermission>
          ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editObserverVehiclePrivilage(params) {
        const observerVehiclePrivilageId = params.id
        history.push(`/telematics/observers/observer-vehicles-privilage/edit/${observerVehiclePrivilageId}`)
    }

    async function deleteObserverVehiclePrivilage(params) {
        const observerVehiclePrivilageId = params.id
        const result = await observerDrivePrivilageService.deleteObserverVehicleAccessPrivilege(observerVehiclePrivilageId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Gözlemci Araç Erişimi silindi")
        } else {
            NotificationManager.error("Gözlemci Araç Erişimi silinirken bir hata oluştu")
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
        const result = await observerDrivePrivilageService.getObserverVehicleAccessPrivileges(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setObserverVehicles(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/observers/observer-vehicle-privilage/create`)
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
      <div className="observer-vehicles-list">
        {isLoading ? (
          <CircularProgress className="observer-vehicles-list-circular-progress" />
        ) : (
          <div className="observer-vehicles-list-table-area">
            <div className="observer-vehicles-list-table-area-header">
              <ButtonPermission
                permission="TE_OBSERVER_VEHICLE_ACCESS_PRIVILEGES_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Gözlemci Araç Erişimi Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={observerVehicles}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="observer-vehicles-list-table-area-table"
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
            <div className="observer-vehicles-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default ObserverVehiclePrivilages
