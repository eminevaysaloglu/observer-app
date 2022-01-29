
export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'device', headerName: 'Device ID', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.device?.id} 
                </span>
            )
        }
    },
    {
        field: 'group', headerName: 'Grup Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.group?.id} 
                </span>
            )
        }
    },
    { field: 'createdAt', headerName: 'Oluşturma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    { field: 'updatedAt', headerName: 'Güncelleme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
];

