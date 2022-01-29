export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
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

