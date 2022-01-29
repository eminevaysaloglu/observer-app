
export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'user', headerName: 'Kullanıcı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.value?.id}
                </span>
            )
        }
    },
    { field: 'country', headerName: 'Ülke', width: 150 },
    //{ field: 'state', headerName: 'Bölge', width: 150 },
    { field: 'city', headerName: 'Şehir', width: 150 },
    { field: 'district', headerName: 'İlçe', width: 150 },
    { field: 'street', headerName: 'Mahalle', width: 150 },
    //{ field: 'postalCode', headerName: 'Posta Kodu', width: 150 },
    { field: 'description', headerName: 'Açıklama', width: 150 },
    //{ field: 'coordinate', headerName: 'Koordinat', width: 150 },
    //{ field: 'coordinateRadius', headerName: 'Koordinat Çapı', width: 150 }
];

