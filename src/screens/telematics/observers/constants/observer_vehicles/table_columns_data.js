export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'vehicle', headerName: 'Araç Plakası', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.vehicle?.id} 
                </span>
            )
        }
    },
    { field: 'driver', headerName: 'Gözlemci Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.observer?.id}  
                </span>
            )
        }
    },
    { field: 'createdAt', headerName: 'Oluşturulma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    { field: 'updatedAt', headerName: 'Güncellenme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> }, 
];