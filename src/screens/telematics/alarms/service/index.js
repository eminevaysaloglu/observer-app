import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'

const service = {
  // SPEED ALARM SERVICE

  async getSpeedAlarms(params) {
    const endPoint = 'speed-alarm'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },
  
  async getSpeedAlarmsWithFilter(params) {
    const endPoint = `speed-alarm/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveSpeedAlarms(payload) {
    const endPoint = 'speed-alarm'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getSpeedAlarm(speedAlarmId) {
    const endPoint = `speed-alarm/${speedAlarmId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateSpeedAlarms(payload) {
    const endPoint = `speed-alarm`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // DEVICE ALARMS SERVICE

  async getDeviceAlarms(params) {
    const endPoint = 'device-alarm'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDeviceAlarms(payload) {
    const endPoint = 'device-alarm'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDeviceAlarm(deviceAlarmId) {
    const endPoint = `device-alarm/${deviceAlarmId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateDeviceAlarms(payload) {
    const endPoint = `device-alarm`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // VEHICLE IGNITION ALARM

  async getVehicleIgnitionAlarms(params) {
    const endPoint = 'ignition-alarm'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveVehicleIgnitionAlarms(payload) {
    const endPoint = 'ignition-alarm'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicleIgnitionAlarm(vehicleIgnitionAlarmId) {
    const endPoint = `ignition-alarm/${vehicleIgnitionAlarmId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateVehicleIgnitionAlarms(payload) {
    const endPoint = `ignition-alarm`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // VEHICLE MOVEMENT ALARMS SERVICES

  async getVehicleMovementAlarms(params) {
    const endPoint = 'movement-alarm'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveVehicleMovementAlarms(payload) {
    const endPoint = 'movement-alarm'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicleMovementAlarm(vehicleMovementAlarmId) {
    const endPoint = `movement-alarm/${vehicleMovementAlarmId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateVehicleMovementAlarms(payload) {
    const endPoint = `movement-alarm`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // GEOFENCE SERVICES

  async getGeofences(params) {
    const endPoint = 'geofence'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveGeofences(payload) {
    const endPoint = 'geofence'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getGeofence(geofenceId) {
    const endPoint = `geofence/${geofenceId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateGeofences(payload) {
    const endPoint = `geofence`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  }
}
export default service
