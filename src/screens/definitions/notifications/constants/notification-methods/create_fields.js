export const fields = () => [
  {
    key: 'id',
    placeHolder: 'id',
    notShow: true,
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'user',
    type: 'auto',
    options: 'users',
    label: (option) => `${option?.id || ''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Kullanıcı Adı',
    defaultValue: {}
  },
  {
    key: 'method',
    type: "text",
    placeHolder: 'Metot',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'createdAt',
    notShow: true,
    defaultValue: null
  },
  {
    key: 'updatedAt',
    notShow: true,
    defaultValue: null
  }
]