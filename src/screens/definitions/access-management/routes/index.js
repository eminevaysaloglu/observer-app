import { Roles, Permissions, RolePermissions, UserRoles } from '../pages'
import RoleShow from '../pages/roles/show'
import RoleCreate from '../pages/roles/create'
import RoleEdit from '../pages/roles/edit'
import RolePermissionCreate from '../pages/role_permissions/create'
import RolePermissionEdit from '../pages/role_permissions/edit'
import UserRoleCreate from '../pages/user_roles/create'
import UserRoleEdit from '../pages/user_roles/edit'

const BASE_PATH = '/definitions/access-management/'

const routes = [
  {
    path: `${BASE_PATH}user-role/`,
    component: UserRoles,
    module: 'PERMISSION_READ',
    name: 'Kullanıcı Rolleri',
    tabView: true
  },
  {
    path: `${BASE_PATH}role/`,
    component: Roles,
    module: 'PERMISSION_READ',
    name: 'Roller',
    tabView: true
  },
  {
    path: `${BASE_PATH}permissions/`,
    component: Permissions,
    name: 'İzinler',
    module: 'PERMISSION_READ',
    tabView: true
  },
  {
    path: `${BASE_PATH}role-permission/`,
    component: RolePermissions,
    name: 'Rol İzin İlişkisi',
    module: 'PERMISSION_READ',
    tabView: true
  },
  {
    path: `${BASE_PATH}role/show/:id`,
    component: RoleShow,
    module: 'PERMISSION_READ',
    name: 'Rol'
  },

  {
    path: `${BASE_PATH}role/create`,
    component: RoleCreate,
    module: 'PERMISSION_READ',
    name: 'Rol Ekle'
  },
  {
    path: `${BASE_PATH}role/edit/:id`,
    component: RoleEdit,
    module: 'PERMISSION_READ',
    name: 'Rol Düzenle'
  },
  {
    path: `${BASE_PATH}role-permission/create`,
    component: RolePermissionCreate,
    module: 'PERMISSION_READ',
    name: 'Rol İzin İlişkisi Ekle'
  },
  {
    path: `${BASE_PATH}role-permission/edit/:id`,
    component: RolePermissionEdit,
    module: 'PERMISSION_READ',
    name: 'Rol İzin İlişkisi Düzenle'
  },
  {
    path: `${BASE_PATH}user-role/create`,
    component: UserRoleCreate,
    module: 'PERMISSION_READ',
    name: 'Kullanıcı Rolü Ekle'
  },
  {
    path: `${BASE_PATH}user-role/edit/:id`,
    component: UserRoleEdit,
    module: 'PERMISSION_READ',
    name: 'Kullanıcı Rolü Düzenle'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}user-role/`
  }
]

export default routes
export { BASE_PATH }
