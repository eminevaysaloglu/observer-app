import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
  async getDevices() {
    const endPoint = `device`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, { page: 0, size: 999999 }, 'Bearer')
    return result
  },

  async summaryReport() {
    const endPoint = `device-status/reporting/summaryReport`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async summaryReportByDeviceId(deviceId) {
    const endPoint = `device-status/reporting/summaryReportByDeviceId/${deviceId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getDeviceVehicleRelations() {
    const endPoint = 'device-vehicle-relation'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, { page: 0, size: 999999 }, 'Bearer')
    return result
  },

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
  },

  async getObserverByUserId(userId){
    const endPoint = `observer/findByUserId/${userId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async findAllRelationsByObserverId(observerId) {
    const endPoint = `observer-vehicle/findAllRelationsByObserverId/${observerId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  }
}

export default service
