
export const columns = [
    { field: 'id', headerName: 'Bildirim Türü', width: 250, notFilter: true },
    {
        field: 'isDefault', headerName: 'Varsayılan', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.value ? 'Var' : 'Yok' }
                </span>
            )
        }
    },
    { field: 'createdAt', headerName: 'Oluşturulma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
];

