import VehicleCreate from '../pages/vehicles/create'
import VehicleEdit from '../pages/vehicles/edit'
import VehicleShow from '../pages/vehicles/show'
import VehicleGroupCreate from '../pages/vehicle_groups/create'
import VehicleGroupEdit from '../pages/vehicle_groups/edit'
import VehicleMetadataCreate from '../pages/vehicle_metadata/create'
import VehicleMetadataEdit from '../pages/vehicle_metadata/edit'
import VehicleGroupRelationCreate from '../pages/vehicle_group_relations/create'
import VehicleGroupRelationEdit from '../pages/vehicle_group_relations/edit'
import VehicleMetadataKeyCreate from '../pages/vehicle_metadata_key/create'
import VehicleMetadataKeyEdit from '../pages/vehicle_metadata_key/edit'
import { Vehicle, VehicleGroups, VehicleMetaData, VehicleGroupRelations, VehicleMetaDataKey } from '../pages'

const BASE_PATH = '/definitions/vehicles/'

const routes = [
  {
    path: '/definitions/vehicles/vehicle/',
    component: Vehicle,
    name: 'Araçlar',
    module: 'VEHICLE_READ',
    tabView: true
  },
  {
    path: '/definitions/vehicles/vehicle-group/',
    component: VehicleGroups,
    name: 'Araç Grupları',
    module: 'VEHICLE_GROUPS_READ',
    tabView: true
  },
  {
    path: '/definitions/vehicles/vehicle-group-relation/',
    component: VehicleGroupRelations,
    name: 'Araç Grup İlişkileri',
    module: 'VEHICLE_GROUP_RELATIONS_READ',
    tabView: true
  },
  {
    path: '/definitions/vehicles/vehicle-metadata/',
    component: VehicleMetaData,
    name: 'Araç Altbilgileri',
    module: 'VEHICLE_METADATA_READ',
    tabView: true
  },
  {
    path: '/definitions/vehicles/vehicle-metadata-key/',
    component: VehicleMetaDataKey,
    name: 'Araç Altbilgi Key',
    module: 'VEHICLE_METADATA_KEY_READ',
    tabView: true
  },
  {
    path: '/definitions/vehicles/vehicle/create',
    component: VehicleCreate,
    module: 'VEHICLE_CREATE',
    name: 'Araç Ekle'
  },
  {
    path: ['/definitions/vehicles/vehicle/edit/:id', '/definitions/vehicles/vehicle/show/:id/edit'],
    component: VehicleEdit,
    module: 'VEHICLE_UPDATE',
    name: 'Araç Düzenle'
  },
  {
    path: ['/definitions/vehicles/vehicle-group/create', '/definitions/vehicles/vehicle/show/:id/create'],
    component: VehicleGroupCreate,
    module: 'VEHICLE_GROUPS_CREATE',
    name: 'Araç Grup Ekle'
  },
  {
    path: [
      '/definitions/vehicles/vehicle-group/edit/:id',
      '/definitions/vehicles/vehicle/show/:vehicleId/vehicle-group-relation/edit/:id'
    ],
    component: VehicleGroupEdit,
    module: 'VEHICLE_GROUPS_UPDATE',
    name: 'Araç Grup Düzenle'
  },
  {
    path: [
      '/definitions/vehicles/vehicle-metadata/create',
      '/definitions/vehicles/vehicle/show/:vehicleId/vehicle-metadata/create'
    ],
    component: VehicleMetadataCreate,
    module: 'VEHICLE_METADATA_CREATE',
    name: 'Araç Altbilgisi Ekle'
  },
  {
    path: [
      '/definitions/vehicles/vehicle-metadata/edit/:id',
      '/definitions/vehicles/vehicle/show/:vehicleId/vehicle-metadata/edit/:id'
    ],
    component: VehicleMetadataEdit,
    module: 'VEHICLE_METADATA_UPDATE',
    name: 'Araç Altbilgisi Düzenle'
  },
  {
    path: [
      '/definitions/vehicles/vehicle-metadata-key/create',
      '/definitions/vehicles/vehicle/show/:vehicleId/vehicle-metadata-key/create'
    ],
    component: VehicleMetadataKeyCreate,
    module: 'VEHICLE_METADATA_KEY_CREATE',
    name: 'Araç Altbilgi Key Ekle'
  },
  {
    path: '/definitions/vehicles/vehicle-metadata-key/edit/:id',
    component: VehicleMetadataKeyEdit,
    module: 'VEHICLE_METADATA_KEY_UPDATE',
    name: 'Araç Altbilgi Key Düzenle'
  },
  {
    path: [
      '/definitions/vehicles/vehicle-group-relation/create',
      '/definitions/vehicles/vehicle/show/:vehicleId/vehicle-group-relation/create'
    ],
    component: VehicleGroupRelationCreate,
    module: 'VEHICLE_GROUP_RELATIONS_CREATE',
    name: 'Araç Grup İlişkisi Ekle'
  },
  {
    path: [
      '/definitions/vehicles/vehicle-group-relation/edit/:id',
      '/definitions/vehicles/vehicle/show/:vehicleId/vehicle-group-relation/edit/:id'
    ],
    component: VehicleGroupRelationEdit,
    module: 'VEHICLE_GROUP_RELATIONS_UPDATE',
    name: 'Araç Grup İlişkisi Düzenle'
  },
  {
    path: '/definitions/vehicles/vehicle/show/:id',
    component: VehicleShow,
    module: 'VEHICLE_READ',
    name: 'Araç Görüntüle'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}vehicle/`
  }
]

export default routes
export { BASE_PATH }