export const columns = [
  { field: 'id', headerName: 'No', width: 150 },
  {
    field: 'vehicle',
    headerName: 'Araç Plakası',
    width: 150,
    renderCell: (data) => {
      return <span>{data.value.id}</span>
    }
  },
  {
    field: 'created_at',
    headerName: 'Oluşturulma Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'updated_at',
    headerName: 'Güncelleme Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
