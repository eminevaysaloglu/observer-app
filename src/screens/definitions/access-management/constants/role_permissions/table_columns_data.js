
export const columns = [
    {
        field: 'role', headerName: 'Rol', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.role.id}
                </span>
            )
        }
    },
    {
        field: 'permissions', headerName: 'İzin', width: 150, renderCell: (data) => {
            return (
                <span>
                    {data.row.permission.id} 
                </span>
            )
        }
    },
];

