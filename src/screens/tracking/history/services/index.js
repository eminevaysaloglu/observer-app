import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'

const services = {
  async findAllByDeviceIdAndDeviceTimeBetween(params) {
    const endPoint = 'location-data/findAllByDeviceIdAndDeviceTimeBetween'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getAllDevices() {
    const endPoint = 'device'
    const params = {
      page: 0,
      size: 99999
    }
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  }
}

export default services
