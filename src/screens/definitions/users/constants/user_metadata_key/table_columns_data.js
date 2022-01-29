
export const columns = [
  { field: 'id', headerName: 'Key Adı', width: 150, notFilter: true },
  { field: 'decription', headerName: 'Açıklama', width: 150 },
  { field: 'creadetAt', headerName: 'Oluşturulma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
  { field: 'updatedAt', headerName: 'Güncellenme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> }
]

