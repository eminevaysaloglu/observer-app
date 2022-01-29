import DeviceCreate from '../pages/devices/create'
import DeviceShow from '../pages/devices/show'
import DeviceEdit from '../pages/devices/edit'
import DeviceGroupCreate from '../pages/device_groups/create'
import DeviceGroupEdit from '../pages/device_groups/edit'
import DeviceMetadataCreate from '../pages/device_metadata/create'
import DeviceMetadataEdit from '../pages/device_metadata/edit'
import DeviceGroupRelationCreate from '../pages/device_group_relations/create'
import DeviceGroupRelationEdit from '../pages/device_group_relations/edit'
import DeviceVehicleRelationCreate from '../pages/device_vehicle_relations/create'
import DeviceVehicleRelationEdit from '../pages/device_vehicle_relations/edit'
import DeviceMetadataKeyCreate from '../pages/device_metadata_key/create'
import DeviceMetadataKeyEdit from '../pages/device_metadata_key/edit'
import { Devices, DevicesGroups, DeviceMetaData, DeviceGroupRelations, DeviceVehicleRelations, DeviceMetaDataKey } from '../pages'

const BASE_PATH = '/definitions/devices/'
const routes = [
  {
    path: '/definitions/devices/device/',
    component: Devices,
    name: 'Cihazlar',
    title: 'Devices',
    module: 'DEVICE_READ',
    tabView: true
  },
  {
    path: '/definitions/devices/device-group/',
    component: DevicesGroups,
    name: 'Cihaz Grupları',
    title: 'DEVICE_GROUPS',
    module: 'DEVICE_GROUPS_READ',
    tabView: true
  },
  {
    path: '/definitions/devices/device-group-relation/',
    component: DeviceGroupRelations,
    name: 'Cihaz Grup İlişkileri',
    title: 'DEVICE_GROUP_RELATION',
    module: 'DEVICE_GROUP_RELATIONS_READ',
    tabView: true
  },
  {
    path: '/definitions/devices/device-vehicle-relation/',
    component: DeviceVehicleRelations,
    name: 'Cihaz Araç İlişkileri',
    title: 'DEVICE_VEHICLE_RELATION',
    module: 'DEVICE_VEHICLE_RELATIONS_READ',
    tabView: true
  },
  {
    path: '/definitions/devices/device-metadata/',
    component: DeviceMetaData,
    name: 'Cihaz Altbilgileri',
    title: 'DEVICE_METADATA',
    module: 'DEVICE_METADATA_READ',
    tabView: true
  },
  {
    path: '/definitions/devices/device-metadata-key/',
    component: DeviceMetaDataKey,
    name: 'Cihaz Altbilgi Key',
    title: 'DEVICE_METADATA_KEY',
    module: 'DEVICE_METADATA_KEY_READ',
    tabView: true
  },

  {
    path: '/definitions/devices/device/create/',
    component: DeviceCreate,
    module: 'DEVICE_CREATE',
    title: 'DEVICE_CREATE',
    name: 'Cihaz Ekle'
  },
  {
    path: ['/definitions/devices/device/edit/:id', '/definitions/devices/device/show/:id/edit'],
    component: DeviceEdit,
    title: 'DEVICE_UPDATE',
    module: 'DEVICE_UPDATE',
    name: 'Cihaz Düzenle'
  },
  {
    path: ['/definitions/devices/device-group/create', '/definitions/devices/device/show/:deviceId/device-group/create'],
    component: DeviceGroupCreate,
    title: 'DEVICE_GROUP_CREATE',
    module: 'DEVICE_GROUP_CREATE',
    name: 'Cihaz Grup Ekle'
  },
  {
    path: ['/definitions/devices/device-group/edit/:id', '/definitions/devices/device/show/:deviceId/device-group/edit/:id'],
    component: DeviceGroupEdit,
    title: 'DEVICE_GROUP_EDIT',
    module: 'DEVICE_GROUPS_UPDATE',
    name: 'Cihaz Grup Düzenle'
  },
  {
    path: [
      '/definitions/devices/device-metadata/edit/:id',
      '/definitions/devices/device/show/:deviceId/device-metadata/edit/:id'
    ],
    component: DeviceMetadataEdit,
    module: 'DEVICE_GROUPS_UPDATE',
    title: 'DEVICE_METADATA_EDIT',
    name: 'Cihaz Altbilgisi Düzenle'
  },
  {
    path: ['/definitions/devices/device-metadata/create', '/definitions/devices/device/show/:deviceId/device-metadata/create'],
    component: DeviceMetadataCreate,
    module: 'DEVICE_METADATA_CREATE',
    title: 'DEVICE_METADATA_CREATE',
    name: 'Cihaz Altbilgisi Ekle'
  },
  {
    path: '/definitions/devices/device-metadata-key/edit/:id',
    component: DeviceMetadataKeyEdit,
    module: 'DEVICE_METADATA_KEY_UPDATE',
    title: 'DEVICE_METADATA_KEY_EDIT',
    name: 'Cihaz Altbilgi Key Düzenle'
  },
  {
    path: '/definitions/devices/device-metadata-key/create',
    component: DeviceMetadataKeyCreate,
    module: 'DEVICE_METADATA_KEY_CREATE',
    title: 'DEVICE_METADATA_KEY_CREATE',
    name: 'Cihaz Altbilgi Key Ekle'
  },
  {
    path: [
      '/definitions/devices/device-group-relation/create',
      '/definitions/devices/device/show/:deviceId/device-group-relation/create'
    ],
    component: DeviceGroupRelationCreate,
    module: 'DEVICE_GROUP_RELATION_CREATE',
    title: 'DEVICE_GROUP_RELATION_CREATE',
    name: 'Cihaz Grup İlişkisi Ekle'
  },
  {
    path: [
      '/definitions/devices/device-group-relation/edit/:id',
      '/definitions/devices/device/show/:deviceId/device-group-relation/edit/:id'
    ],
    component: DeviceGroupRelationEdit,
    module: 'DEVICE_GROUP_RELATIONS_UPDATE',
    title: 'DEVICE_GROUP_RELATION_EDIT',
    name: 'Cihaz Grup İlişkisi Düzenle'
  },
  {
    path: [
      '/definitions/devices/device-vehicle-relation/create',
      '/definitions/devices/device/show/:deviceId/device-vehicle-relation/create'
    ],
    component: DeviceVehicleRelationCreate,
    module: 'DEVICE_VEHICLE_RELATION_CREATE',
    title: 'DEVICE_VEHICLE_RELATION_CREATE',
    name: 'Cihaz Araç İlişkisi Ekle'
  },
  {
    path: [
      '/definitions/devices/device-vehicle-relation/edit/:id',
      '/definitions/devices/device/show/:deviceId/device-vehicle-relation/edit/:id'
    ],
    component: DeviceVehicleRelationEdit,
    module: 'DEVICE_VEHICLE_RELATIONS_UPDATE',
    title: 'DEVICE_VEHICLE_RELATION_EDIT',
    name: 'Cihaz Araç İlişkisi Düzenle'
  },
  {
    path: '/definitions/devices/device/show/:id',
    component: DeviceShow,
    name: 'Cihaz',
    module: 'DEVICE_READ'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}device/`
  }
]

export default routes
export { BASE_PATH }
