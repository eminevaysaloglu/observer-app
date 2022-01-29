
export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'methods', headerName: 'Method', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.method.method} 
                </span>
            )
        }
    },
    {
        field: 'methods', headerName: 'Kullanıcı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.method.user.id} 
                </span>
            )
        }
    },
    { field: 'key', headerName: 'Key', width: 150},
    { field: 'value', headerName: 'Değer', width: 150},
    { field: 'createdAt', headerName: 'Oluşturma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    { field: 'updatedAt', headerName: 'Güncelleme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
];

