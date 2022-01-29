export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'user', headerName: 'Sürücü Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.driver?.id} 
                </span>
            )
        }
    },
    { field: 'observer', headerName: 'Gözlemci Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.observer?.id} 
                </span>
            )
        }
    }
];