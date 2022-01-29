import { toIsoString } from "utils/locale"

export const fields = () => [
  {
    key: 'id',
    defaultValue: '',
    notShow: true
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
    placeHolder: 'Kullanıcı',
    defaultValue: {}
  },
  {
    key: 'role',
    type: 'auto',
    options: 'roles',
    label: (option) => `${option?.id || ''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Rol',
    defaultValue: {}
  },
  {
    key: 'createdAt',
    notShow: true,
    defaultValue: toIsoString(new Date())
  },
  {
    key: 'updatedAt',
    notShow: true,
    defaultValue: toIsoString(new Date())
  }
]