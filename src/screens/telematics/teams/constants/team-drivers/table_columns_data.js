export const columns = [
  //{ field: 'id', headerName: 'Takım Sürücü ID', width: 150, notFilter: true },
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
    headerName: 'Kullanıcı Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.driver?.id}</span>
    }
  },
  { field: 'description', headerName: 'Sürücü Açıklama', width: 150 },
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
