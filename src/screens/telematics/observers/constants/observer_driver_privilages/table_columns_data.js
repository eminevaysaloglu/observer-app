export const columns = [
    { field: 'id', headerName: 'No', width: 150, notFilter: true },
    { field: 'observerDriver', headerName: 'Sürücü Adı', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.observerDriver?.driver?.id}
                </span>
            )
        }
    },
    { field: 'observer', headerName: 'Gözlemci İsim', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data?.row?.observerDriver?.observer?.user?.id} 
                </span>
            )
        }
    }
];