import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
  async getSystemEvents(params = { size: 99999, page: 0 }) {
    const endPoint = 'system-event'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserMethods(params= {size: 99999, page: 0}) {
    const endPoint = "user-notification-method"
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUsers(params= {size: 99999, page: 0}) {
    const endPoint = "user"
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getSystemEventNotificationSettings(params = { size: 99999, page: 0 }) {
    const endPoint = `system-event-notification-setting`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')

    return result
  },

  async saveSystemEventNotificationSetting(payload) {
    const endPoint = `system-event-notification-setting`
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getSystemEventNotificationSetting(systemEventNotificationSettingId) {
    const endPoint = `system-event-notification-setting/${systemEventNotificationSettingId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateSystemEventNotificationSetting(payload) {
    const endPoint = `system-event-notification-setting`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteSystemEventNotificationSetting(systemEventNotificationSettingId) {
    const endPoint = `system-event-notification-setting/${systemEventNotificationSettingId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  }
}

export default service
