export const fields = () => [
  {
    key: 'userAccount',
    type: 'auto',
    options: 'accounts',
    label: (option) => `${option?.user?.id}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Kullanıcı',
    defaultValue: null
  },
  {
    key: 'validityBeginDate',
    type: 'datetimeOffset',
    placeHolder: 'Geçerlilik Başlama Tarihi',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: new Date()
  },
  {
    key: 'validityEndDate',
    type: 'datetimeOffset',
    placeHolder: 'Geçerlilik Bitiş Tarihi',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: new Date()
  }
]
