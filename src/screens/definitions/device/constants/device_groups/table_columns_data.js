
export const columns = [
  { field: 'id', headerName: 'Cihaz Grup Adı', width: 150, notFilter: true },
  { field: 'description', headerName: 'Açıklama', width: 150 },
  { field: 'createdAt', headerName: 'Oluşturma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
  { field: 'updatedAt', headerName: 'Güncelleme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> }
]

