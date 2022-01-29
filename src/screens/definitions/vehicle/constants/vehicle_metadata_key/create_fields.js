export const fields = () => [
  {
    key: 'id',
    type: 'text',
    placeHolder: 'Key Adı',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'description',
    type: 'text',
    placeHolder: 'Açıklama',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'createdAt',
    notShow: true
  },
  {
    key: 'updatedAt',
    notShow: true
  }
]