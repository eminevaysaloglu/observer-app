
export const columns = [
    { field: 'id', headerName: 'ID', width: 150, notFilter: true },
    {
        field: 'userAccount', headerName: 'Hesap ID', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.value.id} 
                </span>
            )
        },
        notFilter: true
    },
    { field: 'validityBeginDate', headerName: 'Geçerlilik Başlama Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>},
    { field: 'validityEndDate', headerName: 'Geçerlilik Bitiş Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> }
];

