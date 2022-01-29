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
    key: 'name',
    type: 'text',
    placeHolder: 'Alarm Adı',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'status',
    type: 'text',
    placeHolder: 'Durum',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'type',
    type: 'text',
    placeHolder: 'Tür',
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
    key: 'beginTime',
    type: 'datetimeOffset',
    placeHolder: 'Başlama Tarihi',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: new Date().getTime()
  },
  {
    key: 'endTime',
    type: 'datetimeOffset',
    placeHolder: 'Bitiş Tarihi',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: new Date().getTime()
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