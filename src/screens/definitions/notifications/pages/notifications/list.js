import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation, Route
} from "react-router-dom";
import {
    DataGrid, GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/notifications/table_columns_data'
import notificationsServices from '../../service';
import { Pagination, CircularProgress, Button, IconButton, TextField } from '@mui/material'
import '../../style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel } from 'components';


function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function Notifications() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    async function getData() {
        setIsLoading(true)
        const payload = {
            size: 10,
            page: page,
        }
        const result = await notificationsServices.getNotifications(payload)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setNotifications(data)
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
        <div className="notifications-list">
            {
                isLoading ?
                    <CircularProgress className="notifications-list-circular-progress" /> :
                    <div className="notifications-list-table-area">
                        <div className="notifications-list-table-area-header">

                        </div>

                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
                            rows={notifications}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="notifications-list-table-area-table"
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
                        <div className="notifications-list-table-area-pagination">
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

export default Notifications
