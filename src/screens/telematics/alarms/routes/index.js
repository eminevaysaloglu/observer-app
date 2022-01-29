import { SpeedAlarms, DeviceAlarms, VehicleIgnitionAlarms, VehicleMovementAlarms, Geofence } from '../pages'
import SpeedAlarmCreate from '../pages/speed-alarm/create'
import SpeedAlarmEdit from '../pages/speed-alarm/edit'
import DeviceAlarmCreate from '../pages/device-alarm/create'
import DeviceAlarmEdit from '../pages/device-alarm/edit'
import VehicleIgnitionAlarmCreate from '../pages/vehicle-ignition-alarm/create'
import VehicleIgnitionAlarmEdit from '../pages/vehicle-ignition-alarm/edit'
import VehicleMovementAlarmCreate from '../pages/vehicle-ignition-alarm/create'
import VehicleMovementAlarmEdit from '../pages/vehicle-ignition-alarm/edit'
import GeofenceCreate from '../pages/geofence/create'
import GeofenceEdit from '../pages/geofence/edit'

const BASE_PATH = '/telematics/alarms/'
const routes = [
  {
    path: '/telematics/alarms/speed-alarm',
    component: SpeedAlarms,
    name: 'Hız Alarmları',
    title: 'SPEED_ALARMS_READ',
    module: 'TE_SPEED_ALARMS_READ',
    tabView: true
  },
  {
    path: '/telematics/alarms/device-alarm',
    component: DeviceAlarms,
    name: 'Cihaz Alarmları',
    title: 'DEVICE_ALARMS_READ',
    module: 'TE_DEVICE_ALARMS_READ',
    tabView: true
  },
  {
    path: '/telematics/alarms/vehicle-ignition-alarm',
    component: VehicleIgnitionAlarms,
    name: 'Kontak Alarmları',
    title: 'VEHICLE_IGNITION_ALARMS_READ',
    module: 'TE_VEHICLE_IGNITION_ALARMS_READ',
    tabView: true
  },
  {
    path: '/telematics/alarms/vehicle-movement-alarm',
    component: VehicleMovementAlarms,
    name: 'Hareket Alarmları',
    title: 'VEHICLE_MOVEMENT_ALARMS_READ',
    module: 'TE_VEHICLE_MOVEMENT_ALARMS_READ',
    tabView: true
  },
  {
    path: '/telematics/alarms/geofence',
    component: Geofence,
    name: 'Bölge Alarmları',
    title: 'GEOFENCES_READ',
    module: 'TE_GEOFENCES_READ',
    tabView: true
  },
  //////////////////////////////////////////////////////
  {
    path: '/telematics/alarms/speed-alarm/create',
    component: SpeedAlarmCreate,
    name: 'Hız Alarmı Ekle',
    title: 'SPEED_ALARMS_CREATE',
    module: 'TE_SPEED_ALARMS_CREATE'
  },
  {
    path: '/telematics/alarms/speed-alarm/edit/:id',
    component: SpeedAlarmEdit,
    name: 'Hız Alarmı Düzenle',
    title: 'SPEED_ALARMS_UPDATE',
    module: 'TE_SPEED_ALARMS_UPDATE'
  },
  {
    path: '/telematics/alarms/device-alarm/create',
    component: DeviceAlarmCreate,
    name: 'Cihaz Alarmı Ekle',
    title: 'DEVICE_ALARMS_CREATE',
    module: 'TE_DEVICE_ALARMS_CREATE'
  },
  {
    path: '/telematics/alarms/device-alarm/edit/:id',
    component: DeviceAlarmEdit,
    name: 'Cihaz Alarmı Düzenle',
    title: 'DEVICE_ALARMS_UPDATE',
    module: 'TE_DEVICE_ALARMS_UPDATE'
  },
  {
    path: '/telematics/alarms/vehicle-ignition-alarm/create',
    component: VehicleIgnitionAlarmCreate,
    name: 'Kontak Alarmı Ekle',
    title: 'VEHICLE_IGNITION_ALARMS_CREATE',
    module: 'TE_VEHICLE_IGNITION_ALARMS_CREATE'
  },
  {
    path: '/telematics/alarms/vehicle-ignition-alarm/edit/:id',
    component: VehicleIgnitionAlarmEdit,
    name: 'Kontak Alarmı Düzenle',
    title: 'VEHICLE_MOVEMENT_ALARMS_UPDATE',
    module: 'TE_VEHICLE_MOVEMENT_ALARMS_UPDATE'
  },
  {
    path: '/telematics/alarms/vehicle-movement-alarm/create',
    component: VehicleMovementAlarmCreate,
    name: 'Hareket Alarmı Ekle',
    title: 'VEHICLE_MOVEMENT_ALARMS_CREATE',
    module: 'TE_VEHICLE_MOVEMENT_ALARMS_CREATE'
  },
  {
    path: '/telematics/alarms/vehicle-movement-alarm/edit/:id',
    component: VehicleMovementAlarmEdit,
    name: 'Hareket Alarmı Düzenle',
    title: 'VEHICLE_MOVEMENT_ALARMS_UPDATE',
    module: 'TE_VEHICLE_MOVEMENT_ALARMS_UPDATE'
  },
  {
    path: '/telematics/alarms/geofence/create',
    component: GeofenceCreate,
    name: 'Bölge Alarmı Ekle',
    title: 'GEOFENCES_CREATE',
    module: 'TE_GEOFENCES_CREATE'
  },
  {
    path: '/telematics/alarms/geofence/edit/:id',
    component: GeofenceEdit,
    name: 'Bölge Alarmı Düzenle',
    title: 'GEOFENCES_UPDATE',
    module: 'TE_GEOFENCES_UPDATE'
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}speed-alarm`
  }
]
export default routes
export { BASE_PATH }