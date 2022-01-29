
export const columns = [
  { field: 'id', headerName: 'Kullanıcı ID', width: 150, filterEP: 'id'  },
  { field: 'yerlemId', headerName: 'Yerlem ID', width: 150, notFilter: true  },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'gsm', headerName: 'GSM', width: 150, filterEP: 'findByGsm' },
  { field: 'firstname', headerName: 'İsim', width: 150, filterEP: 'findByName' },
  { field: 'lastname', headerName: 'Soyisim', width: 150, filterEP: 'findByLastname' },
]

