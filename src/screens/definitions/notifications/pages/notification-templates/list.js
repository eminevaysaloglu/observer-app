import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch, useLocation, Route } from 'react-router-dom'
import { DataGrid, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { columns } from '../../constants/notification-templates/table_columns_data'
import notificationTemplatesServices from '../../service';
import { Pagination, CircularProgress } from '@mui/material'
import '../../style.scss'
import { CustomNoRowsOverlay, CustomFilterPanel, ButtonPermission } from 'components';
import EditIcon from '@mui/icons-material/Edit'
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

function NotificationTemplates() {
    const history = useHistory();
    const match = useRouteMatch();
    const url = match.url
    const location = useLocation()
    const [sortModel, setSortModel] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [notificationTemplates, setNotificationTemplates] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
      const column = {
        field: 'actions',
        headerName: 'Aksiyonlar',
        type: 'actions',
        width: 150,
        getActions: (params) => [
          <ButtonPermission permission="NOTIFICATION_TEMPLATES_UPDATE" grid icon={<EditIcon />} onClick={() => editNotificationTemplates(params)} label="Edit"></ButtonPermission>,
        ]
      }
      columns.unshift(column)
    }, [])

    useEffect(() => {
        getData()
    }, [page, sortModel, location])

    function editNotificationTemplates(params) {
      const id = params.id
      history.push(`${BASE_PATH}notification-template/edit/${id}`)
    }

    async function getData() {
        setIsLoading(true)
        const { field, sort } = sortModel.length > 0 ? sortModel[0] : { field: 'createdAt', sort: 'desc' }
        const params = {
          size: 10,
          page: page,
          sort: `${field},${sort}`
        }
        const result = await notificationTemplatesServices.getNotificationTemplates(params)
        const { data, properties } = result.data
        setCount(properties.totalPages)
        setNotificationTemplates(data)
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
        {isLoading ? (
          <CircularProgress className="notifications-list-circular-progress" />
        ) : (
          <div className="notifications-list-table-area">
            <DataGrid
              components={{ Toolbar: Header, NoRowsOverlay: CustomNoRowsOverlay, FilterPanel: CustomFilterPanel }}
              rows={notificationTemplates}
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
              <Pagination page={page + 1} onChange={paginationChange} count={count} color="primary" size="small" />
            </div>
          </div>
        )}
      </div>
    )
}

export default NotificationTemplates
