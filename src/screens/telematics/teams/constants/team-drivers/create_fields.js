import { toIsoString } from "utils/locale"

export const fields = () => [
  {
    key: 'id',
    notShow: true
  },
  {
    key: 'team',
    type: 'auto',
    options: 'teams',
    label: (option) => `${option?.id || ''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Takım Adı',
    defaultValue: null
  },
  {
    key: 'driver',
    type: 'auto',
    options: 'drivers',
    label: (option) => `${option?.id || ''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Sürücü',
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
  }
]