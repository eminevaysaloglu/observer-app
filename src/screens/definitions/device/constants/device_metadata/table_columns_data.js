export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'device', headerName: 'Cihaz ID', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.device?.id} 
                </span>
            )
        }
    },
    {
        field: 'key', headerName: 'Key', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.key?.id} 
                </span>
            )
        }
    },
    { field: 'datatype', headerName: 'Veri Tipi', width: 150 },
    { field: 'value', headerName: 'Değer', width: 150 }
];