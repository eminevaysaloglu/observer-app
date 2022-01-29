
export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'user', headerName: 'Kullanıcı Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.user.id} 
                </span>
            )
        }
    },
    { field: 'method', headerName: 'Metod', width: 150},
    { field: 'createdAt', headerName: 'Oluşturma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    { field: 'updatedAt', headerName: 'Güncelleme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
];

