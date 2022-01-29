export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {field: 'firstname',  headerName: 'Ad', width: 150 },
    {field: 'lastname',  headerName: 'Soyad', width: 150 },
    {field: 'phone',  headerName: 'Telefon', width: 150 },
    {field: 'email',  headerName: 'Mail', width: 150 },
    {field: 'description',  headerName: 'Açıklama', width: 150 },
    {
        field: 'entity', headerName: 'Varlık Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.entity?.id} 
                </span>
            )
        }
    },
];