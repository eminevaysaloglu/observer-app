export const columns = [
  { field: 'id', headerName: 'Cihaz ID', width: 150 },
  { field: 'model', headerName: 'Model', width: 150 },
  { field: 'dataProtocol', headerName: 'Protokol', width: 150 },
  { field: 'dataProtocolVersion', headerName: 'Protokol Versiyonu', width: 150 },
  { field: 'company', headerName: 'Şirket', width: 150 },
  {
    field: 'createdAt',
    headerName: 'Oluşturma Tarihi',
    notFilter: true,
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
