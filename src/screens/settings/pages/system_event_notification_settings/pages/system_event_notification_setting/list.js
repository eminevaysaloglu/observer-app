import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation, Route
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { NotificationManager } from 'react-notifications';
import { columns } from '../../constants/table_columns_data'
import service from '../../service';
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel } from 'components';
import Create from './create'
import Edit from './edit'

function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function SystemEventNotificationSetting() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [systemEventNotificationSettings, setSystemEventNotificationSettings] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} onClick={() => editSystemEventNotificationSetting(params)} label="Delete"></GridActionsCellItem>,
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteSystemEventNotificationSetting(params)} label="Delete"></GridActionsCellItem>
            ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        if (location.pathname === "/settings" || location.pathname === "/settings/")
            getData()
    }, [page, location])

    function editSystemEventNotificationSetting(params) {
        const systemEventNotificationSettingId = params.id
        history.push(`/settings/system-event-notification-settings/edit/${systemEventNotificationSettingId}`)
    }

    async function deleteSystemEventNotificationSetting(params) {
        const systemEventNotificationSettingId = params.id
        const result = await service.deleteSystemEventNotificationSetting(systemEventNotificationSettingId)
        if(result?.status !== 200){
            NotificationManager.error("Sistem olay bildirimi silinemedi")
        } else {
            NotificationManager.success("Sistem olay bildirimi silindi")
        }
        getData()
    }

    async function getData() {
        setIsLoading(true)
        const payload = {
            size: 10,
            page: page
        }
        const result = await service.getSystemEventNotificationSettings(payload)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setSystemEventNotificationSettings(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/settings/system-event-notification-settings/create`)
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
        <div className="system-event-notification-setting-list">
            {
                isLoading ?
                    <CircularProgress className="system-event-notification-setting-list-circular-progress" /> :
                    <div className="system-event-notification-setting-list-table-area">
                        <div className="system-event-notification-setting-list-table-area-header">
                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                size="small"
                                onClick={goCreate}
                            >
                                Yeni Sistem Olay Bildirimi Ekle
                            </Button>
                        </div>

                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
                            rows={systemEventNotificationSettings}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="system-event-notification-setting-list-table-area-table"
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
                        <div className="system-event-notification-setting-list-table-area-pagination">
                            <Pagination
                                page={page + 1}
                                onChange={paginationChange}
                                count={count}
                                color="primary"
                                size="small" />
                        </div>
                    </div>
            }
            <div>
                <Route path={[`${url}/create`, `/settings/system-event-notification-settings/create`]}>
                    <Create />
                </Route>

                <Route path={[`${url}/edit/:id`, `/settings/system-event-notification-settings/edit/:id`]}>
                    <Edit />
                </Route>
            </div>
        </div>
    )
}

export default SystemEventNotificationSetting
