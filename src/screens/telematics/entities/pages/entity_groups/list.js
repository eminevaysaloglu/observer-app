import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/entity_groups/table_columns_data'
import entityGroupServices from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
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

function EntityGroups() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [entityGroups, setEntityGroups] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
          field: 'actions',
          headerName: 'Aksiyonlar',
          type: 'actions',
          width: 150,
          getActions: (params) => [
            <ButtonPermission
              permission="TE_ENTITY_GROUPS_UPDATE"
              grid
              icon={<EditIcon />}
              onClick={() => editEntityGroup(params)}
              label="Edit"
            ></ButtonPermission>,
            <ButtonPermission
              permission="TE_ENTITY_GROUPS_DELETE"
              grid
              icon={<DeleteIcon />}
              onClick={() => deleteEntityGroup(params)}
              label="Delete"
            ></ButtonPermission>
          ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editEntityGroup(params) {
        const entityGroupId = params.id
        history.push(`/telematics/entities/entity-group/edit/${entityGroupId}`)
    }

    async function deleteEntityGroup(params) {
        const entityGroupId = params.id
        const result = await entityGroupServices.deleteEntityGroup(entityGroupId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Varlık Grubları silindi")
        } else {
            NotificationManager.error("Varlık Grubları silinirken bir hata oluştu")
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
        const result = await entityGroupServices.getEntityGroups(params)
        const data = result?.data?.data
const properties = result?.data?.properties
        setCount(properties.totalPages)
        setEntityGroups(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/telematics/entities/entity-group/create`)
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
      <div className="entity-groups-list">
        {isLoading ? (
          <CircularProgress className="entity-groups-list-circular-progress" />
        ) : (
          <div className="entity-groups-list-table-area">
            <div className="entity-groups-list-table-area-header">
              <ButtonPermission
                permission="TE_ENTITY_GROUPS_CREATE"
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={goCreate}
              >
                Yeni Varlık Grubları Ekle
              </ButtonPermission>
            </div>

            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={entityGroups}
              columns={columns}
              rowHeight={35}
              headerHeight={35}
              autoHeight
              hideFooter
              showColumnRightBorder
              sortingMode="server"
              className="entity-groups-list-table-area-table"
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
            <div className="entity-groups-list-table-area-pagination">
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default EntityGroups
