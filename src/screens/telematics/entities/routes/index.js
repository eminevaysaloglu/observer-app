import EntityCreate from '../pages/entities/create'
import EntityEdit from '../pages/entities/edit'
import EntityContactCreate from '../pages/entity_contacts/create'
import EntityContactEdit from '../pages/entity_contacts/edit'
import EntityGroupRelationCreate from '../pages/entity_group_relations/create'
import EntityGroupRelationEdit from '../pages/entity_group_relations/edit'
import EntityGroupCreate from '../pages/entity_groups/create'
import EntityGroupEdit from '../pages/entity_groups/edit'
import EntityLocationCreate from '../pages/entity_locations/create'
import EntityLocationEdit from '../pages/entity_locations/edit'
import EntityTypeCreate from '../pages/entity_types/create'
import EntityTypeEdit from '../pages/entity_types/edit'
import { Entities, EntityContacts, EntityGroupRelations, EntityGroups, EntityLocations, EntityTypes } from '../pages'

const BASE_PATH = '/telematics/entities/'

const routes = [
  {
    path: '/telematics/entities/entity/',
    component: Entities,
    name: 'Varlıklar',
    title: 'ENTITIES_READ',
    module: 'TE_ENTITIES_READ',
    tabView: true
  },
  {
    path: '/telematics/entities/entity-contact/',
    component: EntityContacts,
    name: 'Varlık İletişim Bilgileri',
    title: 'ENTITY_CONTACTS_READ',
    module: 'TE_ENTITY_CONTACTS_READ',
    tabView: true
  },
  {
    path: '/telematics/entities/entity-group/',
    component: EntityGroups,
    name: 'Varlık Grupları',
    title: 'ENTITY_GROUPS_READ',
    module: 'TE_ENTITY_GROUPS_READ',
    tabView: true
  },
  {
    path: '/telematics/entities/entity-group-relation/',
    component: EntityGroupRelations,
    name: 'Varlık Grup İlişkileri',
    title: 'ENTITY_GROUP_RELATIONS_READ',
    module: 'TE_ENTITY_GROUP_RELATIONS_READ',
    tabView: true
  },
  {
    path: '/telematics/entities/entity-location/',
    component: EntityLocations,
    name: 'Varlık Lokasyonları',
    title: 'ENTITY_LOCATIONS_READ',
    module: 'TE_ENTITY_LOCATIONS_READ',
    tabView: true
  },
  {
    path: '/telematics/entities/entity-type/',
    component: EntityTypes,
    name: 'Varlık Tipleri',
    title: 'ENTITY_TYPES_READ',
    module: 'TE_ENTITY_TYPES_READ',
    tabView: true
  },
  {
    path: '/telematics/entities/entity/create',
    component: EntityCreate,
    title: 'ENTITIES_CREATE',
    module: 'TE_ENTITIES_CREATE',
    name: 'Varlık Ekle'
  },
  {
    path: '/telematics/entities/entity/edit/:id',
    component: EntityEdit,
    title: 'ENTITIES_UPDATE',
    module: 'TE_ENTITIES_UPDATE',
    name: 'Varlık Düzenle'
  },
  {
    path: '/telematics/entities/entity-contact/create',
    component: EntityContactCreate,
    title: 'ENTITY_CONTACTS_CREATE',
    module: 'TE_ENTITY_CONTACTS_CREATE',
    name: 'Varlık İletişimi Ekle'
  },
  {
    path: '/telematics/entities/entity-contact/edit/:id',
    component: EntityContactEdit,
    title: 'ENTITY_CONTACTS_UPDATE',
    module: 'TE_ENTITY_CONTACTS_UPDATE',
    name: 'Varlık İletişimi Düzenle'
  },
  {
    path: '/telematics/entities/entity-group-relation/create',
    component: EntityGroupRelationCreate,
    title: 'ENTITY_GROUP_RELATIONS_CREATE',
    module: 'TE_ENTITY_GROUP_RELATIONS_CREATE',
    name: 'Varlık Grup İlişkisi Ekle'
  },
  {
    path: '/telematics/entities/entity-group-relation/edit/:id',
    component: EntityGroupRelationEdit,
    title: 'ENTITY_GROUP_RELATIONS_UPDATE',
    module: 'TE_ENTITY_GROUP_RELATIONS_UPDATE',
    name: 'Varlık Grup İlişkisi Düzenle'
  },
  {
    path: '/telematics/entities/entity-group/create',
    component: EntityGroupCreate,
    title: 'ENTITY_GROUPS_CREATE',
    module: 'TE_ENTITY_GROUPS_CREATE',
    name: 'Varlık Grubu Ekle'
  },
  {
    path: '/telematics/entities/entity-group/edit/:id',
    component: EntityGroupEdit,
    title: 'ENTITY_GROUPS_UPDATE',
    module: 'TE_ENTITY_GROUPS_UPDATE',
    name: 'Varlık Grubu Düzenle'
  },
  {
    path: '/telematics/entities/entity-location/create',
    component: EntityLocationCreate,
    title: 'ENTITY_LOCATIONS_CREATE',
    module: 'TE_ENTITY_LOCATIONS_CREATE',
    name: 'Varlık Lokasyonu Ekle'
  },
  {
    path: '/telematics/entities/entity-location/edit/:id',
    component: EntityLocationEdit,
    title: 'ENTITY_LOCATIONS_UPDATE',
    module: 'TE_ENTITY_LOCATIONS_UPDATE',
    name: 'Varlık Lokasyonu Düzenle'
  },
  {
    path: '/telematics/entities/entity-type/create',
    component: EntityTypeCreate,
    title: 'ENTITY_TYPES_CREATE',
    module: 'TE_ENTITY_TYPES_CREATE',
    name: 'Varlık Tipi Ekle'
  },
  {
    path: '/telematics/entities/entity-type/edit/:id',
    component: EntityTypeEdit,
    title: 'ENTITY_TYPES_UPDATE',
    module: 'TE_ENTITY_TYPES_UPDATE',
    name: 'Varlık Tipi Düzenle'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}entity/`
  }
]

export default routes
export { BASE_PATH }
