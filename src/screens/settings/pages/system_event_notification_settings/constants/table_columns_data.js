
export const columns = [
    {
        field: 'event', headerName: 'Olay', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.event.id}
                </span>
            )
        }
    },
    {
        field: 'method', headerName: 'Yöntem', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.method.id}
                </span>
            )
        }
    },
    {
        field: 'user', headerName: 'Kullanıcı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.user.id}
                </span>
            )
        }
    }
];

