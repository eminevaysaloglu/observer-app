import { toIsoString } from "utils/locale"

export const fields = () => [
  {
    key: 'id',
    type: 'number',
    notShow: true
  },
  {
    key: 'team',
    type: 'auto',
    options: 'teams',
    label: (option) => `${option?.id}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Takım Adı',
    defaultValue: null
  },
  {
    key: 'vehicle',
    type: 'auto',
    options: 'vehicles',
    label: (option) => `${option?.id}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Araç Plakası',
    defaultValue: null
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
    notShow: true,
    defaultValue: null,
    defaultValue: toIsoString(new Date())
  },
  {
    key: 'updatedAt',
    notShow: true
  }
]