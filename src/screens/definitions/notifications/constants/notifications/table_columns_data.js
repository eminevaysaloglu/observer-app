
export const columns = [
    { field: 'id', headerName: 'Bildirim ID', width: 150, notFilter: true },
    {
        field: 'user', headerName: 'Kullanıcı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.user.firstname} {data.row.user.lastname}
                </span>
            )
        }
    },
    { field: 'method', headerName: 'Metod', width: 150},
    {
        field: 'type', headerName: 'Tipi', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.type.id}
                </span>
            )
        }
    },
    { field: 'method', headerName: 'Metod', width: 150 },
    { field: 'status', headerName: 'Durum', width: 150 },
    { field: 'title', headerName: 'Başlık', width: 150 },
    { field: 'message', headerName: 'Mesaj', width: 150 },
    { field: 'date', headerName: 'Tarih', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
];

