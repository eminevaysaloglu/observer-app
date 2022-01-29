import { toIsoString } from "utils/locale"

export const fields = () => [
  {
    key: 'id',
    defaultValue: '',
    notShow: true,
    validation: (value) => {
      return false
    }
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
    key: 'country',
    type: 'text',
    placeHolder: 'Ülke',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'state',
    type: 'text',
    placeHolder: 'Bölge',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'city',
    type: 'text',
    placeHolder: 'Şehir',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'district',
    type: 'text',
    placeHolder: 'İlçe',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'street',
    type: 'text',
    placeHolder: 'Mahalle',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'postalCode',
    type: 'text',
    placeHolder: 'Posta Kodu',
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
    key: 'coordinate',
    type: 'text',
    placeHolder: 'Koordinat',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'coordinateRadius',
    type: 'text',
    placeHolder: 'Koordinat Çapı',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: '',
    notShow: true
  },
  {
    key: 'createdAt',
    notShow: true,
    defaultValue: toIsoString(new Date())
  }
]