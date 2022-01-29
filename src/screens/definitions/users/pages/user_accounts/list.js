import React, { useEffect, useState } from 'react'
import {
    useHistory, useRouteMatch, useLocation, Route
} from "react-router-dom";
import {
    DataGrid, GridActionsCellItem,
    GridToolbarFilterButton, GridToolbarExport
} from '@mui/x-data-grid';
import { columns } from '../../constants/user_accounts/table_columns_data'
import userAccountsServices from '../../service';
import { Pagination, CircularProgress, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import './style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components';
import { BASE_PATH } from '../../routes';

function Header(props) {
    return (
        <div className="table-header">
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </div>
    );
}

function UserAccountsList() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [userAccounts, setUserAccounts] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        const column = {
          field: 'actions',
          headerName: 'Aksiyonlar',
          type: 'actions',
          width: 150,
          getActions: (params) => [
            <ButtonPermission
              permission="USER_ACCOUNTS_UPDATE"
              grid
              icon={<EditIcon />}
              onClick={() => editUserAccounts(params)}
              label="Edit"
            ></ButtonPermission>
          ]
        }
        columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editUserAccounts(params) {
        const userAccountsId = params.id
        history.push(`${BASE_PATH}user-account/edit/${userAccountsId}`)
    }



    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: "createdAt", sort: "desc" }
        const params = {
            size: 10,
            page: page,
            sort: `${field},${sort}`
        }
        const result = await userAccountsServices.getUserAccounts(params)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setUserAccounts(data)
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
        <div className="user-accounts-list">
            {
                isLoading ?
                    <CircularProgress className="user-accounts-list-circular-progress" /> :
                    <div className="user-accounts-list-table-area">
                        <DataGrid
                            components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
                            rows={userAccounts}
                            columns={columns}
                            rowHeight={35}
                            headerHeight={35}
                            autoHeight
                            hideFooter
                            showColumnRightBorder
                            sortingMode="server"
                            className="user-accounts-list-table-area-table"
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
                        <div className="user-accounts-list-table-area-pagination">
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

export default UserAccountsList
