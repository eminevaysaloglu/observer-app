
export const columns = [
  { field: 'id', headerName: 'No', width: 350, notFilter: true },
  { field: 'tittle', headerName: 'Başlık', width: 150 },
  { field: 'message', headerName: 'Mesaj', width: 150 },
  { field: 'createdAt', headerName: 'Oluşturma Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> },
  { field: 'updatedAt', headerName: 'Güncelleme Tarihi', width: 150, renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div> }
]

