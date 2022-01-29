export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    {
        field: 'vehicle', headerName: 'Araç', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.observerVehicle?.vehicle?.id}
                </span>
            )
        }
    },
    {
        field: 'observer', headerName: 'Gözlemci İsim', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.observerDriver?.observer?.user?.id} 
                </span>
            )
        }
    }
];