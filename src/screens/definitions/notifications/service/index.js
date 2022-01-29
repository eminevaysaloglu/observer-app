import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'
import { NotificationManager } from 'react-notifications';

const service = {
  async getNotifications(params) {
    const endPoint = 'user-notification'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveNotifications(payload) {
    const endPoint = 'user-notification'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getNotification(notificationsId) {
    const endPoint = `user-notification/${notificationsId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateNotifications(notificationsId, payload) {
    const endPoint = `user-notifications/${notificationsId}`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteNotifications(notificationsId) {
    const endPoint = `user-notifications/${notificationsId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // NOTIFICATION METHODS SERVICES

  async getNotificationMethods(params) {
    const endPoint = 'user-notification-method'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveNotificationMethods(payload) {
    const endPoint = 'user-notification-method'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getNotificationMethod(notificationMethodsId) {
    const endPoint = `user-notification-method/${notificationMethodsId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateNotificationMethods(payload) {
    const endPoint = `user-notifications-method/`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteNotificationMethods(notificationMethodsId) {
    const endPoint = `user-notifications-method/${notificationMethodsId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },
  async getUsers(params) {
    const endPoint = 'user'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  // NOTIFICATION METHOD PROPERTIES SERVICES

  async getNotificationMethodProperties(params) {
    const endPoint = 'user-notification-method-property'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveNotificationMethodProperties(payload) {
    const endPoint = 'user-notification-method-property'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getNotificationMethodProperty(notificationMethodPropertyId) {
    const endPoint = `user-notification-method-property/${notificationMethodPropertyId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateNotificationMethodProperties(payload) {
    const endPoint = `user-notifications-method-property/`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteNotificationMethodProperties(notificationMethodPropertyId) {
    const endPoint = `user-notifications-method-property/${notificationMethodPropertyId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // NOTIFICATION TYPES SERVICES

  async getNotificationTypes(params) {
    const endPoint = 'notification-type'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveNotificationTypes(payload) {
    const endPoint = 'notification-type'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getNotificationType(notificationTypesId) {
    const endPoint = `notification-type/${notificationTypesId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateNotificationTypes(payload) {
    const endPoint = `notification-type/`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteNotificationTypes(notificationTypesId) {
    const endPoint = `notification-type/${notificationTypesId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // NOTIFICATION TEMPLATES SERVICES

  async getNotificationTemplates(params) {
    const endPoint = 'notification-template'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveNotificationTemplates(payload) {
    const endPoint = 'notification-template'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getNotificationTemplate(notificationTemplatesId) {
    const endPoint = `notification-template/${notificationTemplatesId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateNotificationTemplates(payload) {
    const endPoint = `notification-template/`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteNotificationTemplates(notificationTemplatesId) {
    const endPoint = `notification-template/${notificationTemplatesId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  }
}

export default service