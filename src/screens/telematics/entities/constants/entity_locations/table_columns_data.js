export const columns = [
  { field: 'id', headerName: 'No', width: 150, notFilter: true },
  {
    field: 'entity',
    headerName: 'Varlık Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.entity?.id}</span>
    }
  },
  {
    field: 'userAddress',
    headerName: 'Kullanıcı Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.userAddress?.user?.id}</span>
    }
  },
  {
    field: 'userAddress',
    headerName: 'Kullanıcı Koordinatı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.userAddress?.coordinate}</span>
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
