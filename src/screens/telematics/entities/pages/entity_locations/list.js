import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/entity_locations/table_columns_data'
import entityLocationService from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components';
import { NotificationManager } from 'react-notifications';
import { BASE_PATH } from '../../routes'

function Header() {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function EntityLocations() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [entityLocations, setEntityLocations] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
          field: 'actions',
          headerName: 'Aksiyonlar',
          type: 'actions',
          width: 150,
          getActions: (params) => [
            <ButtonPermission
              permission="TE_ENTITY_LOCATIONS_UPDATE"
              grid
              icon={<EditIcon />}
              onClick={() => editEntityLocations(params)}
              label="Edit"
            ></ButtonPermission>
          ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editEntityLocations(params) {
        const entityLocationId = params.id
        history.push(`/telematics/entities/entity-location/edit/${entityLocationId}`)
    }


    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: "createdAt", sort: "desc" }
        const params = {
            size: 10,
            page: page,
            sort: `${field},${sort}`
        }
        const result = await entityLocationService.getEntityLocations(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setEntityLocations(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/entities/entity-location/create`)
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
      <div className="entity-locations-list">
        {isLoading ? (
          <CircularProgress className="entity-locations-list-circular-progress" />
        ) : (
          <div className="entity-locations-list-table-area">
            <div className="entity-locations-list-table-area-header">
              <ButtonPermission
                permission="TE_ENTITY_LOCATIONS_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Varlık Lokasyonu Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={entityLocations}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="entity-locations-list-table-area-table"
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
            <div className="entity-locations-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default EntityLocations
