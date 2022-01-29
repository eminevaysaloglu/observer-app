export const columns = [
  { field: 'id', headerName: 'Araç Plaka', width: 150},
  { field: 'engineNumber', headerName: 'Motor Numarası', width: 150},
  { field: 'chasis', headerName: 'Şasi', width: 150 },
  { field: 'brand', headerName: 'Marka', width: 150 },
  { field: 'model', headerName: 'Model', width: 150 },
  { field: 'modelYear', headerName: 'Model Yılı', width: 150, notFilter: true },
  { field: 'load', headerName: 'Yük', width: 150, notFilter: true },
  { field: 'type', headerName: 'Tip', width: 150 },
  {
    field: 'createdAt',
    headerName: 'Oluşturma Tarihi',
    width: 150,
    notFilter: true,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
