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
    key: 'method',
    type: 'auto',
    options: 'methods',
    label: (option) => `${option?.method || ''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Metot',
    defaultValue: {}
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