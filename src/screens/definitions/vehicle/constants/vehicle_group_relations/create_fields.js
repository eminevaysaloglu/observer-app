export const fields = () => [
  {
    key: 'vehicle',
    type: 'auto',
    options: 'vehicles',
    label: (option) => `${option?.id ||''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Araç Plakası',
    defaultValue: null
  },
  {
    key: 'group',
    type: 'auto',
    options: 'groups',
    label: (option) => `${option?.id ||''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Grup Adı',
    defaultValue: null
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