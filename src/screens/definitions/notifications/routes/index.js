import {Notifications, NotificationMethods, NotificationMethodProperties, NotificationTypes, NotificationTemplates} from '../pages'
import NotificationMethodCreate from '../pages/notification-methods/create'
import NotificationMethodEdit from '../pages/notification-methods/edit'
import NotificationMethodPropertyCreate from '../pages/notification-method-properties/create'
import NotificationMethodPropertyEdit from '../pages/notification-method-properties/edit'
import NotificationTemplateEdit from '../pages/notification-templates/edit'

const BASE_PATH = '/definitions/notifications/'
const routes = [
  {
    path: '/definitions/notifications/notification',
    component: Notifications,
    name: 'Bildirimler',
    title: 'Notifications',
    module: 'NOTIFICATION_READ',
    tabView: true
  },
  {
    path: '/definitions/notifications/notification-method/',
    component: NotificationMethods,
    name: 'Bildirim Yöntemleri',
    title: 'Notification-methods',
    module: 'NOTIFICATION_METHODS_READ',
    tabView: true
  },
  {
    path: '/definitions/notifications/notification-method-property/',
    component: NotificationMethodProperties,
    name: 'Bildirim Yöntem Özellikleri',
    title: 'Notification-method-properties',
    module: 'NOTIFICATION_METHODS_PROPERTIES_READ',
    tabView: true
  },
  {
    path: '/definitions/notifications/notification-type/',
    component: NotificationTypes,
    name: 'Bildirim Türleri',
    title: 'Notification-types',
    module: 'NOTIFICATION_TYPES_READ',
    tabView: true
  },
  {
    path: '/definitions/notifications/notification-template/',
    component: NotificationTemplates,
    name: 'Bildirim Taslakları',
    title: 'Notification-templates',
    module: 'NOTIFICATION_TEMPLATES_READ',
    tabView: true
  },

  ///////////////////////////////////////////////////////////////////////////////

  {
    path: '/definitions/notifications/notification-method/create/',
    component: NotificationMethodCreate,
    title: 'NOTIFICATION-METHODS-CREATE',
    module: 'NOTIFICATION_METHODS_CREATE',
    name: 'Bildirim Yöntemi Ekle'
  },
  {
    path: '/definitions/notifications/notification-method/edit/:id',
    component: NotificationMethodEdit,
    title: ' NOTIFICATION-METHODS-EDIT',
    module: 'NOTIFICATION_METHODS_UPDATE',
    name: 'Bildirim Yöntemi Düzenle'
  },
  {
    path: '/definitions/notifications/notification-method-property/create/',
    component: NotificationMethodPropertyCreate,
    title: 'NOTIFICATION-METHOD-PROPERTIES-CREATE',
    module: 'NOTIFICATION_METHOD_PROPERTIES_CREATE',
    name: 'Bildirim Yöntem Özelliği Ekle'
  },
  {
    path: '/definitions/notifications/notification-method-property/edit/:id',
    component: NotificationMethodPropertyEdit,
    title: ' NOTIFICATION-METHOD-PROPERTIES-EDIT',
    module: 'NOTIFICATION_METHODS_PROPERTIES_UPDATE',
    name: 'Bildirim Yöntem Özelliği Düzenle'
  },
  {
    path: '/definitions/notifications/notification-template/edit/:id',
    component: NotificationTemplateEdit,
    title: ' NOTIFICATION-TEMPLATES-EDIT',
    module: 'NOTIFICATION_TEMPLATES_UPDATE',
    name: 'Bildirim Taslağı Düzenle'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}notification`
  }
]


export default routes
export { BASE_PATH }
