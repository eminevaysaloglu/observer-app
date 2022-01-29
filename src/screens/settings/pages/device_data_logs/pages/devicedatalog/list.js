import React, { useEffect, useState } from 'react'
import {
    useRouteMatch, useLocation
} from "react-router-dom";
import { DataGrid, GridToolbarExport } from '@mui/x-data-grid';
import { columns } from '../../constants/table_columns_data'
import deviceDataLogServices from '../../service';
import { Pagination, CircularProgress, Button } from '@mui/material'
import '../../style.scss'
import { CustomNoRowsOverlay } from 'components';
import FilterDrawer from '../../components/FilterDrawer'

function DeviceDataLog() {
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [currencies, setCurrencies] = useState([])
    const [count, setCount] = useState(0)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [devices, setDevices] = useState([])

    const [filterData, setFilterData] = useState(
        {
            id: "",
            beginDate: Date.now(),
            endDate: Date.now()
        }
    )

    function handleFilter(data) {
        if (data) {
            console.log(data);
        }
    }

    useEffect(() => {
        if (location.pathname === "/settings" || location.pathname === "/settings/")
            getData()
    }, [page, sortModel, location])

    async function getData() {
        setIsLoading(true)
        const payload = {
            size: 10,
            page: page
        }
        const result = await deviceDataLogServices.getDeviceDataLogs(payload)
        const res_devices = await deviceDataLogServices.getDevices()
        setDevices(res_devices?.data?.data)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setCurrencies(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function Header(props) {
        return (
            <div className="table-header">
                <Button onClick={() => { setOpenDrawer(true) }}>Filtrele</Button>
                <GridToolbarExport />
            </div>
        );
    }

    return (
        <div className="device-data-log-list">
            {
                isLoading ?
                    <CircularProgress className="device-data-log-list-circular-progress" /> :
                    <div className="device-data-log-list-table-area">
                        <FilterDrawer
                            openDrawer={openDrawer}
                            setOpenDrawer={setOpenDrawer}
                            handleFilter={(e) => handleFilter(e)}
                            filterData={filterData}
                            devices={devices}
                        />
                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay }}
                            rows={currencies}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="device-data-log-list-table-area-table"
                            disableColumnMenu
                            sortModel={sortModel}
                            onSortModelChange={setSortModel}
                            componentsProps={{
                                Toolbar: {
                                    value: columns,
                                    setOpenDrawer: setOpenDrawer
                                }
                            }}
                        />
                        <div className="device-data-log-list-table-area-pagination">
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

export default DeviceDataLog
