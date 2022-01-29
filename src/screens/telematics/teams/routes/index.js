import TeamCreate from '../pages/teams/create'
import TeamEdit from '../pages/teams/edit'
import TeamAuthoritiesCreate from '../pages/team-authorities/create'
import TeamAuthoritiesEdit from '../pages/team-authorities/edit'
import TeamVehiclesCreate from '../pages/team-vehicles/create'
import TeamVehiclesEdit from '../pages/team-vehicles/edit'
import TeamDriversCreate from '../pages/team-drivers/create'
import TeamDriversEdit from '../pages/team-drivers/edit'
import TeamEntitiesCreate from '../pages/team-entities/create'
import TeamEntitiesEdit from '../pages/team-entities/edit'
import { TeamAuthorities, TeamDrivers, TeamEntities, Teams, TeamVehicles } from '../pages'

const BASE_PATH = '/telematics/teams/'
const routes = [
  {
    path: '/telematics/teams/team/',
    component: Teams,
    name: 'Takımlar',
    title: 'Teams',
    module: 'TE_TEAMS_READ',
    tabView: true
  },
  {
    path: '/telematics/teams/team-authorities/',
    component: TeamAuthorities,
    name: 'Takım Yetkilileri',
    title: 'TEAM_AUTHORITIES',
    module: 'TE_TEAM_AUTHORITIES_READ',
    tabView: true
  },
  {
    path: '/telematics/teams/team-vehicles/',
    component: TeamVehicles,
    name: 'Takım Araçları',
    title: 'TEAM_VEHICLES',
    module: 'TE_TEAM_VEHICLES_READ',
    tabView: true
  },
  {
    path: '/telematics/teams/team-drivers/',
    component: TeamDrivers,
    name: 'Takım Şoförleri',
    title: 'TEAM_DRIVERS',
    module: 'TE_TEAM_DRIVERS_READ',
    tabView: true
  },
  {
    path: '/telematics/teams/team-entities/',
    component: TeamEntities,
    name: 'Takım Varlıkları',
    title: 'TEAM_ENTITIES',
    module: 'TE_TEAM_ENTITIES_READ',
    tabView: true
  },
  {
    path: '/telematics/teams/team/create',
    component: TeamCreate,
    module: 'TE_TEAMS_CREATE',
    title: 'TEAMS_CREATE',
    name: 'Takım Ekle'
  },
  {
    path: '/telematics/teams/team/edit/:id',
    component: TeamEdit,
    module: 'TE_TEAMS_UPDATE',
    title: 'TEAMS_UPDATE',
    name: 'Takım Düzenle'
  },
  {
    path: '/telematics/teams/team-authorities/create',
    component: TeamAuthoritiesCreate,
    module: 'TE_TEAM_AUTHORITIES_CREATE',
    title: 'TEAM_AUTHORITIES_CREATE',
    name: 'Takım Yetkilisi Ekle'
  },
  {
    path: '/telematics/teams/team-authorities/edit/:id',
    component: TeamAuthoritiesEdit,
    module: 'TE_TEAM_AUTHORITIES_UPDATE',
    title: 'TEAM_AUTHORITIES_UPDATE',
    name: 'Takım Yetkilisi Düzenle'
  },
  {
    path: '/telematics/teams/team-vehicles/create',
    component: TeamVehiclesCreate,
    module: 'TE_TEAM_VEHICLES_CREATE',
    title: 'TEAM_VEHICLES_CREATE',
    name: 'Takım Aracı Ekle'
  },
  {
    path: '/telematics/teams/team-vehicles/edit/:id',
    component: TeamVehiclesEdit,
    module: 'TE_TEAM_VEHICLES_UPDATE',
    title: 'TEAM_VEHICLES_UPDATE',
    name: 'Takım Aracı Düzenle'
  },
  {
    path: '/telematics/teams/team-drivers/create',
    component: TeamDriversCreate,
    module: 'TE_TEAM_DRIVERS_CREATE',
    title: 'TEAM_DRIVERS_CREATE',
    name: 'Takım Sürücüsü Ekle'
  },
  {
    path: '/telematics/teams/team-drivers/edit/:id',
    component: TeamDriversEdit,
    module: 'TE_TEAM_DRIVERS_UPDATE',
    title: 'TEAM_DRIVERS_UPDATE',
    name: 'Takım Sürücüsü Düzenle'
  },
  {
    path: '/telematics/teams/team-entities/create',
    component: TeamEntitiesCreate,
    module: 'TE_TEAM_ENTITIES_CREATE',
    title: 'TEAM_ENTITIES_CREATE',
    name: 'Takım Varlığı Ekle'
  },
  {
    path: '/telematics/teams/team-entities/edit/:id',
    component: TeamEntitiesEdit,
    module: 'TE_TEAM_ENTITIES_UPDATE',
    title: 'EAM_ENTITIES_UPDATE',
    name: 'Takım Varlığı Düzenle'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}team/`
  }
]

export default routes
export { BASE_PATH }
