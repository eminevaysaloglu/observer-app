import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
  async findByVehicleId(vehicleId) {
    const endPoint = `/vehicle/findByVehicleId/${vehicleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {})
    return result
  }
}

export default service
