
export const columns = [
    {
        field: 'id', headerName: 'Id', width: 150, renderCell: (params) => (
            <span>
                {params?.id}
            </span>
        ),
        notFilter: true
    },
    { field: 'deviceTime', headerName: 'Cihazdaki Tarih', width: 150, notFilter: true, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    { field: 'exceptionClass', headerName: 'İstisna', width: 150, notFilter: true },
    { field: 'exceptionMessage', headerName: 'İstisna Mesajı', width: 150, notFilter: true },
    { field: 'query', headerName: 'Sorgu', width: 150, notFilter: true }
];

