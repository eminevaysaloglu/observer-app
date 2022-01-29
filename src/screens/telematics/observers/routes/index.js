import ObserverCreate from '../pages/observers/create'
import ObserverEdit from '../pages/observers/edit'
import ObserverDriverCreate from '../pages/observer_drivers/create'
import ObserverDriverEdit from '../pages/observer_drivers/edit'
import ObserverVehicleCreate from '../pages/observer_vehicles/create'
import ObserverVehicleEdit from '../pages/observer_vehicles/edit'
import ObserverDriverPrivilageCreate from '../pages/observer_driver_privilages/create'
import ObserverDriverPrivilageEdit from '../pages/observer_driver_privilages/edit'
import ObserverVehiclePrivilageCreate from '../pages/observer_vehicle_privilages/create'
import ObserverVehiclePrivilageEdit from '../pages/observer_vehicle_privilages/edit'
import { ObserverDriverPrivilages, ObserverDrivers, Observers, ObserverVehiclePrivilages, ObserverVehicles } from '../pages'

const BASE_PATH = '/telematics/observers/'

const routes = [
  {
    path: '/telematics/observers/observer/',
    component: Observers,
    name: 'Gözlemciler',
    title: 'OBSERVERS',
    module: 'TE_OBSERVERS_READ',
    tabView: true
  },
  {
    path: '/telematics/observers/observer-driver/',
    component: ObserverDrivers,
    name: 'Gözlemci Sürücü İlişkileri',
    title: 'OBSERVER_DRIVERS',
    module: 'TE_OBSERVER_DRIVERS_READ',
    tabView: true
  },
  {
    path: '/telematics/observers/observer-vehicle/',
    component: ObserverVehicles,
    name: 'Gözlemci Araç İlişkileri',
    title: 'OBSERVER_VEHICLES',
    module: 'TE_OBSERVER_VEHICLES_READ',
    tabView: true
  },
  {
    path: '/telematics/observers/observer-vehicle-privilage/',
    component: ObserverVehiclePrivilages,
    name: 'Gözlemci Araç Erişimleri',
    title: 'OBSERVER_VEHICLE_ACCESS_PRIVILEGES',
    module: 'TE_OBSERVER_VEHICLE_ACCESS_PRIVILEGES_READ',
    tabView: true
  },
  {
    path: '/telematics/observers/observer-driver-privilage/',
    component: ObserverDriverPrivilages,
    name: 'Gözlemci Sürücü Erişimi',
    title: 'OBSERVER_DRIVER_ACCESS_PRIVILEGES',
    module: 'TE_OBSERVER_DRIVER_ACCESS_PRIVILEGES_READ',
    tabView: true
  },
  {
    path: '/telematics/observers/observer/create',
    component: ObserverCreate,
    title: 'OBSERVERS_CREATE',
    module: 'TE_OBSERVERS_CREATE',
    name: 'Gözlemci Ekle'
  },
  {
    path: '/telematics/observers/observer/edit/:id',
    component: ObserverEdit,
    title: 'OBSERVERS_UPDATE',
    module: 'TE_OBSERVERS_UPDATE',
    name: 'Gözlemci Düzenle'
  },
  {
    path: '/telematics/observers/observer-driver/create',
    component: ObserverDriverCreate,
    title: 'OBSERVER_DRIVERS_CREATE',
    module: 'TE_OBSERVER_DRIVERS_CREATE',
    name: 'Gözlemci Sürücü İlişkisi Ekle'
  },
  {
    path: '/telematics/observers/observer-driver/edit/:id',
    component: ObserverDriverEdit,
    title: 'OBSERVER_DRIVERS_UPDATE',
    module: 'TE_OBSERVER_DRIVERS_UPDATE',
    name: 'Gözlemci Sürücü İlişkisi Düzenle'
  },
  {
    path: '/telematics/observers/observer-vehicle/create',
    component: ObserverVehicleCreate,
    title: 'OBSERVER_VEHICLES_CREATE',
    module: 'TE_OBSERVER_VEHICLES_CREATE',
    name: 'Gözlemci Araç İlişkisi Ekle'
  },
  {
    path: '/telematics/observers/observer-vehicle/edit/:id',
    component: ObserverVehicleEdit,
    title: 'OBSERVER_VEHICLES_UPDATE',
    module: 'TE_OBSERVER_VEHICLES_UPDATE',
    name: 'Gözlemci Araç İlişkisi Düzenle'
  },
  {
    path: '/telematics/observers/observer-vehicle-privilage/create',
    component: ObserverVehiclePrivilageCreate,
    title: 'OBSERVER_VEHICLE_ACCESS_PRIVILEGES_CREATE',
    module: 'TE_OBSERVER_VEHICLE_ACCESS_PRIVILEGES_CREATE',
    name: 'Gözlemci Araç Erişimi Ekle'
  },
  {
    path: '/telematics/observers/observer-vehicle-privilage/edit/:id',
    component: ObserverVehiclePrivilageEdit,
    title: 'OBSERVER_VEHICLE_ACCESS_PRIVILEGES_UPDATE',
    module: 'TE_OBSERVER_VEHICLE_ACCESS_PRIVILEGES_UPDATE',
    name: 'Gözlemci Araç Erişimi Düzenle'
  },
  {
    path: '/telematics/observers/observer-driver-privilage/create',
    component: ObserverDriverPrivilageCreate,
    title: 'OBSERVER_DRIVER_ACCESS_PRIVILEGES_CREATE',
    module: 'TE_OBSERVER_DRIVER_ACCESS_PRIVILEGES_CREATE',
    name: 'Gözlemci Sürücü Erişimi Ekle'
  },
  {
    path: '/telematics/observers/observer-driver-privilage/edit/:id',
    component: ObserverDriverPrivilageEdit,
    title: 'OBSERVER_DRIVER_ACCESS_PRIVILEGES_UPDATE',
    module: 'TE_OBSERVER_DRIVER_ACCESS_PRIVILEGES_UPDATE',
    name: 'Gözlemci Sürücü Erişimi Düzenle'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}observer/`
  }
]

export default routes
export { BASE_PATH }
