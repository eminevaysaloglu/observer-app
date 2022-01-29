import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid'
import { columns } from '../../constants/vehicle-ignition-alarm/table_columns_data'
import vehicleIgnitionAlarmsServices from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import '../../style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components';
import EditIcon from '@mui/icons-material/Edit'
import Add from '@mui/icons-material/Add'
import { NotificationManager } from 'react-notifications'
import { BASE_PATH } from '../../routes'

function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function VehicleIgnitionAlarms() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [vehicleIgnitionAlarms, setVehicleIgnitionAlarms] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
      const column = {
        field: 'actions',
        headerName: 'Aksiyonlar',
        type: 'actions',
        width: 150,
        getActions: (params) => [
          <ButtonPermission
            permission="TE_VEHICLE_IGNITION_ALARMS_UPDATE"
            grid
            icon={<EditIcon />}
            onClick={() => editVehicleIgnitionAlarms(params)}
            label="Edit"
          ></ButtonPermission>
        ]
      }
      columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editVehicleIgnitionAlarms(params) {
      const id = params.id
      history.push(`${BASE_PATH}vehicle-ignition-alarm/edit/${id}`)
    }

    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
        const params = {
          size: 10,
          page: page,
          sort: `${field},${sort}`
        }
        const result = await vehicleIgnitionAlarmsServices.getVehicleIgnitionAlarms(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setVehicleIgnitionAlarms(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
      history.push(`${BASE_PATH}vehicle-ignition-alarm/create/`)
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
      <div className="alarms-list">
        {isLoading ? (
          <CircularProgress className="alarms-list-circular-progress" />
        ) : (
          <div className="alarms-list-table-area">
            <div className="alarms-list-table-area-header">
              <ButtonPermission
                permission="TE_VEHICLE_IGNITION_ALARMS_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Kontak Alarmı Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={vehicleIgnitionAlarms}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="alarms-list-table-area-table"
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
            <div className="alarms-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default VehicleIgnitionAlarms
