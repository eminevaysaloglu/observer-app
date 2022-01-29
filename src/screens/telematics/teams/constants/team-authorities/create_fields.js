import { v4 as uuidv4 } from 'uuid';
import { toIsoString } from "utils/locale"

export const fields = () => [
  {
    key: 'id',
    defaultValue: uuidv4(),
    notShow: true
  },
  {
    key: 'team',
    type: 'auto',
    options: 'teams',
    label: (option) => `${option?.id ||''}`,
    validation: (value) => {
      if (!value) return true
      else false
    },
    placeHolder: 'Takım Adı',
    defaultValue: null
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
    notShow: true,
    defaultValue: null
  }
]