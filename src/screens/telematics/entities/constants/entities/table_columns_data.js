export const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'typeId',
    headerName: 'Varlık Tipi',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.type?.id}</span>
    }
  },
  {
    field: 'userId',
    headerName: 'Kullanıcı Adı',
    width: 150,
    renderCell: (data) => {
      return <span>{data?.row?.user?.id}</span>
    }
  },
  { field: 'description', headerName: 'Açıklama', width: 150 },
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
