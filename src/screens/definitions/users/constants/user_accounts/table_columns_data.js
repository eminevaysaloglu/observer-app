
export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'user', headerName: 'Kullanıcı Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.value.id} 
                </span>
            )
        }
    },
    { field: 'locale', headerName: 'Konum', width: 150},
    //{ field: 'timezone', headerName: 'Saat Dilimi', width: 150 },
    //{ field: 'status', headerName: 'Durum', width: 150 },
    { field: 'lastAccessedTime', headerName: 'Son Erişim Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    //{ field: 'registeredTime', headerName: 'Kayıt Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
    {
        field: 'verified', headerName: 'Kısıtlama', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.value ? 'Var' : 'Yok' }
                </span>
            )
        }
    },
    { field: 'theme', headerName: 'Tema', width: 150},
];

