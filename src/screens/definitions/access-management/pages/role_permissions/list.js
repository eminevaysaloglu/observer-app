import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation, Route
} from "react-router-dom";
import { columns } from '../../constants/role_permissions/table_columns_data'
import rolePermissionsServices from '../../service';
import { Pagination, CircularProgress, Button } from '@mui/material'
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel } from 'components';
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    DataGrid, GridActionsCellItem, GridToolbarDensitySelector,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { NotificationManager } from 'react-notifications';
import { BASE_PATH } from '../../routes';


function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function RolePermissionsList() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [roles, setRoles] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} onClick={() => editRolePermission(params)} label="Delete"></GridActionsCellItem>,
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteRolePermission(params)} label="Delete"></GridActionsCellItem>
            ]
        }
        columns.unshift(column)
    }, [])

    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: "createdAt", sort: "desc" }
        const params = {
            size: 10,
            page: page,
            sort: `${field},${sort}`
        }
        const result = await rolePermissionsServices.getRolePermissions(params)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setRoles(data)
        setIsLoading(false)
    }

    function editRolePermission(params) {
        const id = params.id
        history.push(`${BASE_PATH}role-permission/edit/${id}`)
    }
 
    async function deleteRolePermission(params) {
        const rolePermissionId = params.id
        const result = await rolePermissionsServices.deleteRolePermission(rolePermissionId)
        if (result?.status === 200) {
            getData()
            NotificationManager.success("Rol İzin İlişkisi silindi")
        } else {
            NotificationManager.error("Rol İzin İlişkisi silinirken bir hata oluştu")
        }
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
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

    function goCreate() {
        history.push(`${BASE_PATH}role-permission/create`)
    }

    return (
        <div className="roles-list">
            {
                isLoading ?
                    <CircularProgress className="roles-list-circular-progress" /> :
                    <div className="roles-list-table-area">
                        <div className="roles-list-table-area-header">
                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                size="small"
                                onClick={goCreate}
                            >
                                Yeni Rol İzin İlişkisi Ekle
                            </Button>
                        </div>

                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
                            rows={roles}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="roles-list-table-area-table"
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
                        <div className="roles-list-table-area-pagination">
                            <Pagination
                                page={page + 1}
                                onChange={paginationChange}
                                count={count}
                                color="primary"
                                size="small" />
                        </div>
                    </div>
            }
        </div>
    )
}

export default RolePermissionsList
