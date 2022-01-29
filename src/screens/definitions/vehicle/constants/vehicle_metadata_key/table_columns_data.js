export const columns = [
  { field: 'id', headerName: 'No', width: 150 },
  { field: 'description', headerName: 'Açıklama', width: 150 },
  {
    field: 'created_at',
    headerName: 'Oluşturulma Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
