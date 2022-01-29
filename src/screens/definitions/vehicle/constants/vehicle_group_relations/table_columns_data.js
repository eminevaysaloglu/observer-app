export const columns = [
  {
    field: 'vehicle',
    headerName: 'Araç Plakası',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.vehicle?.id}</span>
    }
  },
  {
    field: 'group',
    headerName: 'Grup Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.group?.id}</span>
    }
  },
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
