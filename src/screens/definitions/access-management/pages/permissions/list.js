import React, { useEffect, useState } from 'react'
import {
     useRouteMatch, useLocation
} from "react-router-dom";
import {
    DataGrid, GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/permissions/table_columns_data'
import permissionsServices from '../../service';
import { Pagination, CircularProgress } from '@mui/material'
import { CustomNoRowsOverlay, CustomFilterPanel } from 'components';
import './style.scss'

function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function PermissionsList() {
    const match = useRouteMatch();
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [count, setCount] = useState(0)
   
    useEffect(() => {
            getData()
    }, [page, sortModel, location])

    async function getData() {
        setIsLoading(true)
        const params = {
            size: 10,
            page: page,
        }
        const result = await permissionsServices.getPermissions(params)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setPermissions(data)
        setIsLoading(false)
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

    return (
        <div className="permissions-list">
            {
                isLoading ?
                    <CircularProgress className="permissions-list-circular-progress" /> :
                    <div className="permissions-list-table-area">

                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
                            rows={permissions}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="permissions-list-table-area-table"
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
                        <div className="permissions-list-table-area-pagination">
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

export default PermissionsList
