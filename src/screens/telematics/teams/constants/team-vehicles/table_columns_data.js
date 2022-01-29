export const columns = [
  //{ field: 'id', headerName: 'Takım Araç ID', width: 150, notFilter: true },
  {
    field: 'vehicle',
    headerName: 'Araç Plakası',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.vehicle?.id}</span>
    }
  },
  {
    field: 'team',
    headerName: 'Takım Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.team?.id}</span>
    }
  },
  { field: 'description', headerName: 'Açıklama', width: 150 },
  {
    field: 'createdAt',
    headerName: 'Oluşturulma Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  },
  {
    field: 'updatedAt',
    headerName: 'Güncellenme Tarihi',
    width: 150,
    renderCell: (e) => <div>{new Date(e.value).toLocaleString('tr')}</div>
  }
]
