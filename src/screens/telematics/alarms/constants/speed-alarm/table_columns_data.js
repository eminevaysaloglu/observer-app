export const columns = [
  { field: 'id', headerName: 'No', width: 150, notFilter: true },
  { field: 'name', headerName: 'Alarm Adı', width: 150 },
  { field: 'speed', headerName: 'Hız', width: 150, notFilter: true },
  { field: 'status', headerName: 'Durum', width: 150, notFilter: true },
  { field: 'type', headerName: 'Tür', width: 150, notFilter: true },
  { field: 'description', headerName: 'Açıklama', width: 150 },
  {
    field: 'beginTime',
    headerName: 'Başlama Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'endTime',
    headerName: 'Bitiş Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'createdAt',
    headerName: 'Oluşturma Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'updatedAt',
    headerName: 'Güncelleme Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
