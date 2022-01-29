export const columns = [
  { field: 'id', headerName: 'No', width: 150, notFilter: true },
  {
    field: 'userId',
    headerName: 'Gözlemci Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.user?.id}</span>
    }
  },
  { field: 'description', headerName: 'Açıklama', width: 150 },
  {
    field: 'createdAt',
    headerName: 'Oluşturulma Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'updatedAt',
    headerName: 'Güncellenme Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
