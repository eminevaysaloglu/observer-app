export const columns = [
  { field: 'id', headerName: 'Varlık Tpi', width: 150 },
  { field: 'description', headerName: 'Açıklama', width: 150 },
  {
    field: 'createdAt',
    headerName: 'Oluşturma Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'updatedAt',
    headerName: 'Güncelleme Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
