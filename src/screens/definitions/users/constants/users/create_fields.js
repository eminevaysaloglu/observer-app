export const fields = () => [
  {
    key: 'yerlemId',
    type: 'text',
    placeHolder: 'Kullanıcı Adı',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'appInstance',
    defaultValue: 'yerlem-tr0',
    notShow: true
  },
  {
    key: 'password',
    type: 'text',
    placeHolder: 'Parola',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'token',
    type: 'text',
    placeHolder: 'Token',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: '',
    notShow: true
  },
  {
    key: 'twoFactorAuthentication',
    defaultValue: false,
    notShow: true
  },
  {
    key: 'restricted',
    defaultValue: false,
    notShow: true
  },
  {
    key: 'timezone',
    defaultValue: 'Asia/Istanbul',
    notShow: true
  },
  {
    key: 'email',
    type: 'text',
    placeHolder: 'Email',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'secondaryEmail',
    type: 'text',
    placeHolder: 'Email 2',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: '',
    notShow: true
  },
  {
    key: 'gsm',
    type: 'text',
    placeHolder: 'GSM',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'firstname',
    type: 'text',
    placeHolder: 'İsim',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'lastname',
    type: 'text',
    placeHolder: 'Soyisim',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'locale',
    notShow: true,
    defaultValue: 'tr'
  },
  {
    key: 'roleIds',
    notShow: true,
    defaultValue: []
  }
]

export const fields_edit = () => [
  {
    key: 'id',
    defaultValue: '',
    notShow: true,
    validation: (value) => {
      return false
    }
  },
  {
    key: 'yerlemId',
    type: 'text',
    placeHolder: 'Yerlem Id',
    validation: (value) => {
      if (!value) return true
      else false
    }
  },
  {
    key: 'email',
    type: 'text',
    placeHolder: 'Email',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'secondaryEmail',
    type: 'text',
    placeHolder: 'Email 2',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: '',
    notShow: true
  },
  {
    key: 'timezone',
    defaultValue: '',
    notShow: true
  },
  {
    key: 'status',
    defaultValue: null,
    notShow: true
  },
  {
    key: 'gsm',
    type: 'text',
    placeHolder: 'GSM',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'firstname',
    type: 'text',
    placeHolder: 'İsim',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'lastname',
    type: 'text',
    placeHolder: 'Soyisim',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'locale',
    type: 'text',
    placeHolder: 'Yer',
    validation: (value) => {
      if (!value) return true
      else false
    },
    defaultValue: ''
  },
  {
    key: 'createdAt',
    type: 'text',
    notShow: true,
    validation: (value) => {
      if (!value) return true
      else false
    }
  },
  {
    key: 'updatedAt',
    type: 'text',
    notShow: true,
    validation: (value) => {
      if (!value) return true
      else false
    }
  }
]
