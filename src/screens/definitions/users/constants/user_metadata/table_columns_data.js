
export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'user', headerName: 'Kullanıcı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.account.user.id} 
                </span>
            )
        }
    },
    {
        field: 'key', headerName: 'Key', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.key.id}
                </span>
            )
        }
    },
    { field: 'value', headerName: 'Değer', width: 150 }
];

