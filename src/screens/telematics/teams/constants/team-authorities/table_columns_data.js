export const columns = [
  //{ field: 'id', headerName: 'Takım Yetkili ID', width: 150, notFilter: true },
  {
    field: 'team',
    headerName: 'Takım Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.team?.id}</span>
    }
  },
  {
    field: 'user',
    headerName: 'Takım Yetkilisi',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.user?.id}</span>
    }
  },
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
