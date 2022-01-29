import { toIsoString } from "utils/locale"

export const fields = () => [
  {
    key: 'id',
    notShow: true
  },
  {
    key: 'device',
    type: 'auto',
    options: 'devices',
    label: (option) => `${option?.id ||''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Cihaz ID',
    defaultValue: null
  },
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