
export const columns = [
  {
    field: 'userId',
    headerName: 'Kullanıcı ID',
    width: 150,
    renderCell: (data) => {
      return (
        <span>
          {data.row.user.id} 
        </span>
      )
    }
  },
  {
    field: 'roleId',
    headerName: 'Rol ID',
    width: 150,
    renderCell: (data) => {
      return <span>{data.row.role.id}</span>
    }
  }
]

