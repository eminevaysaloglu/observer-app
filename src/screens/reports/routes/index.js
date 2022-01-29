
import { VehicleReports } from '../pages'

const BASE_PATH = '/reports'
const routes = [
  {
    path: '/reports/vehicle-report/',
    component: VehicleReports,
    name: 'Kontak Raporu',
    title: 'VehicleReports',
    module: 'USER_READ',
    tabView: true
  },
  {
    path: BASE_PATH,
    to: `${BASE_PATH}/vehicle-report/`
  }
]

export default routes
export { BASE_PATH }
