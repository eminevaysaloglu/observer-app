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
import currencyServices from '../../service';
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import service from '../../service';
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

function Currency() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [currencies, setCurrencies] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        const column = {
            field: 'actions',
            headerName: 'Aksiyonlar',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} onClick={() => editCurrency(params)} label="Delete"></GridActionsCellItem>,
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteCurrency(params)} label="Delete"></GridActionsCellItem>
            ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        if (location.pathname === "/settings" || location.pathname === "/settings/")
            getData()
    }, [page, sortModel, location])

    function editCurrency(params) {
        const currencyId = params.id
        history.push(`/settings/currency/edit/${currencyId}`)
    }

    async function deleteCurrency(params) {
        const currencyId = params.id
        const result = await service.deleteCurrency(currencyId)
        if(result?.status !== 200){
            NotificationManager.error("Para birimi silinemedi")
        } else {
            NotificationManager.success("Para birimi silindi")
        }
        getData()
    }

    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: "createdAt", sort: "desc" }
        const payload = {
            size: 10,
            page: page,
            sort: `${field},${sort}`
        }
        const result = await currencyServices.getCurrencies(payload)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setCurrencies(data)
        setIsLoading(false)
    }

    function paginationChange(_, e_page) {
        setPage(e_page - 1)
    }

    function goCreate() {
        history.push(`/settings/currency/create`)
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
        <div className="currency-list">
            {
                isLoading ?
                    <CircularProgress className="currency-list-circular-progress" /> :
                    <div className="currency-list-table-area">
                        <div className="currency-list-table-area-header">
                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                size="small"
                                onClick={goCreate}
                            >
                                Yeni Para Birimi Ekle
                            </Button>
                        </div>

                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
                            rows={currencies}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="currency-list-table-area-table"
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
                        <div className="currency-list-table-area-pagination">
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
                <Route path={[`${url}/create`, `/settings/currency/create`]}>
                    <Create />
                </Route>

                <Route path={[`${url}/edit/:id`, `/settings/currency/edit/:id`]}>
                    <Edit />
                </Route>
            </div>
        </div>
    )
}

export default Currency
