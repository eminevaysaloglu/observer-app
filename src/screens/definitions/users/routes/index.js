import UserShow from '../pages/users/show'
import UserEdit from '../pages/users/edit'
import UserCreate from '../pages/users/create'
import UserMetadataCreate from '../pages/user_metadata/create'
import UserMetadataEdit from '../pages/user_metadata/edit'
import UserAddressCreate from '../pages/user_addresses/create'
import UserAddressEdit from '../pages/user_addresses/edit'
import UserAccountEdit from '../pages/user_accounts/edit'
import UserAccountRestrictionEdit from '../pages/user_account_restrictions/edit'
import UserAccountRestrictionCreate from '../pages/user_account_restrictions/create'
import UserAccountPropertyEdit from '../pages/user_account_properties/edit'
import UserAccountPropertyCreate from '../pages/user_account_properties/create'
import UserMetadataKeyCreate from '../pages/user_metadata_key/create'
import UserMetadataKeyEdit from '../pages/user_metadata_key/edit'
import { Users, UsersAccounts, UserAddresses, UserMetadata, UsersAccountProperties, UsersAccountRestriction, UserMetadataKey } from '../pages'

const BASE_PATH = '/definitions/users/'
const routes = [
  {
    path: '/definitions/users/user/',
    component: Users,
    name: 'Kullanıcılar',
    tabView: true,
    module: 'USER_READ'
  },
  {
    path: '/definitions/users/user-account/',
    component: UsersAccounts,
    name: 'Kullanıcı Hesapları',
    tabView: true,
    module: 'USER_ACCOUNTS_READ'
  },
  {
    path: '/definitions/users/user-address/',
    component: UserAddresses,
    name: 'Kullanıcı Adresleri',
    tabView: true,
    module: 'USER_ADDRESSES_READ'
  },
  {
    path: '/definitions/users/user-account-properties/',
    component: UsersAccountProperties,
    name: 'Kullanıcı Hesabı Özellikleri',
    tabView: true,
    module: 'USER_ACCOUNT_PROPERTIES_READ'
  },
  {
    path: '/definitions/users/user-account-restrictions/',
    component: UsersAccountRestriction,
    name: 'Kullanıcı Hesabı Kısıtlamaları',
    tabView: true,
    module: 'UPDATER_USER_ACCOUNT_RESTRICTIONS_READ'
  },
  {
    path: '/definitions/users/user-metadata/',
    component: UserMetadata,
    name: 'Kullanıcı Altbilgileri',
    tabView: true,
    module: 'USER_METADATA_READ'
  },
  {
    path: '/definitions/users/user-metadata-key/',
    component: UserMetadataKey,
    name: 'Kullanıcı Altbilgi Key',
    tabView: true,
    module: 'USER_METADATA_KEY_READ'
  },
  {
    path: '/definitions/users/user/create',
    component: UserCreate,
    name: 'Kullanıcı Ekle',
    module: 'USER_CREATE'
  },
  {
    path: '/definitions/users/user-account-properties/create',
    component: UserAccountPropertyCreate,
    name: 'Kullanıcı Hesabı Özellikleri Ekle',
    module: 'USER_ACCOUNT_PROPERTIES_CREATE'
  },
  {
    path: [
      '/definitions/users/user-account-restrictions/create',
      '/definitions/users/user/show/:userId/user-account-restrictions/create'
    ],
    component: UserAccountRestrictionCreate,
    name: 'Kullanıcı Hesabı Kısıtlamaları Ekle',
    module: 'UPDATER_USER_ACCOUNT_RESTRICTIONS_CREATE'
  },
  {
    path: ['/definitions/users/user-address/create', '/definitions/users/user/show/:userId/user-address/create'],
    component: UserAddressCreate,
    name: 'Kullanıcı Adresleri Ekle',
    module: 'USER_ADDRESSES_CREATE'
  },
  {
    path: '/definitions/users/user-metadata/create',
    component: UserMetadataCreate,
    name: 'Kullanıcı Altbilgileri Ekle',
    module: 'USER_METADATA_CREATE'
  },
  {
    path: [
      '/definitions/users/user-account-properties/edit/:id',
      '/definitions/users/user/show/:userId/user-account-properties/edit/:id'
    ],
    component: UserAccountPropertyEdit,
    name: 'Kullanıcı Hesabı Özellikleri Düzenle',
    module: 'USER_ACCOUNT_PROPERTIES_UPDATE'
  },

  {
    path: [
      '/definitions/users/user-account-restrictions/edit/:id',
      '/definitions/users/user/show/:userId/user-account-restrictions/edit/:id'
    ],
    component: UserAccountRestrictionEdit,
    name: 'Kullanıcı Hesabı Kısıtlamaları Düzenle',
    module: 'UPDATER_USER_ACCOUNT_RESTRICTIONS_UPDATE'
  },
  {
    path: ['/definitions/users/user-account/edit/:id', '/definitions/users/user/show/:userId/user-account/edit/:id'],
    component: UserAccountEdit,
    name: 'Kullanıcı Hesabı Düzenle',
    module: 'USER_ACCOUNTS_UPDATE'
  },
  {
    path: ['/definitions/users/user-address/edit/:id', '/definitions/users/user/show/:userId/user-address/edit/:id'],
    component: UserAddressEdit,
    name: 'Kullanıcı Adresleri Düzenle',
    module: 'USER_ADDRESSES_UPDATE'
  },
  {
    path: ['/definitions/users/user/user-metadata/edit/:id', '/definitions/users/user/show/:userId/user-metadata/edit/:id'],
    component: UserMetadataEdit,
    name: 'Kullanıcı Altbilgileri Düzenle',
    module: 'USER_METADATA_UPDATE'
  },
  {
    path: ['/definitions/users/user/edit/:id', '/definitions/users/user/show/:id/edit'],
    component: UserEdit,
    name: 'Kullanıcılar Düzenle',
    module: 'USER_UPDATE'
  },
  {
    path: '/definitions/users/user/show/:id',
    component: UserShow,
    name: 'Kullanıcı',
    module: 'USER_READ'
  },
  {
    path: '/definitions/users/user-metadata-key/create',
    component: UserMetadataKeyCreate,
    name: 'Kullanıcı Altbilgi Key Ekle',
    module: 'USER_METADATA_KEY_CREATE'
  },
  {
    path: ['/definitions/users/user/user-metadata-key/edit/:id'],
    component: UserMetadataKeyEdit,
    name: 'Kullanıcı Altbilgi Key Düzenle',
    module: 'USER_METADATA_KEY_UPDATE'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}user/`
  }
]

export default routes
export { BASE_PATH }
