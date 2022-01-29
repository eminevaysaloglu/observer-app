import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
  // DEVİCES SERVİCES

  async getVehicleIgnationEvents(params) {
    const endPoint = 'vehicle-ignition-event/findByVehicleIdAndEventTypeAndTimeBetween'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getDeviceVehicleRelations(){
    const endPoint = "device-vehicle-relation"
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, { page: 0, size: 999999 }, 'Bearer')
    return result
  }
}

export default service