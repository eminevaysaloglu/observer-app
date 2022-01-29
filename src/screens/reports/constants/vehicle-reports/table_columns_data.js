export const columns = [
  {
    field: 'device',
    headerName: 'Cihaz',
    width: 150,
    renderCell: (e) => <div>{e?.value?.id}</div>
  },
  {
    field: 'vehicle',
    headerName: 'Araç',
    width: 150,
    renderCell: (e) => <div>{e?.value?.id}</div>
  },
  {
    field: 'eventType',
    headerName: 'Etkinlik Tipi',
    width: 150
  },
  {
    field: 'time',
    headerName: 'Oluşturma Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
