import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
  // DEVİCES SERVİCES

  async getDevices(params) {
    const endPoint = 'device'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getDevicesWithFilterData(params) {
    const endPoint = `device/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDevice(payload) {
    const endPoint = 'device'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDevice(deviceId) {
    const endPoint = `device/${deviceId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateDevice(payload) {
    const endPoint = `device`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteDevice(deviceId) {
    const endPoint = `devices/${deviceId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // DEVİCE METADATA SERVİCES

  async getDeviceMetadatas(params) {
    const endPoint = 'device-metadata'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDeviceMetadata(payload) {
    const endPoint = 'device-metadata'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDeviceMetadata(deviceMetadataId) {
    const endPoint = `device-metadata/${deviceMetadataId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getDeviceMetadataByDeviceId(deviceId) {
    const endPoint = `device-metadata/findByDeviceId/${deviceId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateDeviceMetadata(deviceMetadataId, payload) {
    const endPoint = `device-metadata/${deviceMetadataId}`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteDeviceMetadata(deviceMetadataId) {
    const endPoint = `device-metadata/${deviceMetadataId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // DEVICE METADATA KEY SERVICES

  async getDeviceMetadataKeys(params) {
    const endPoint = 'device-metadata-key'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDeviceMetadataKey(payload) {
    const endPoint = 'device-metadata-key'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDeviceMetadataKey(deviceMetadataKeyId) {
    const endPoint = `device-metadata-key/${deviceMetadataKeyId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },
  async updateDeviceMetadataKey(payload) {
    const endPoint = `device-metadata-key/`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteDeviceMetadataKey(deviceMetadataKeyId) {
    const endPoint = `device-metadata-key/${deviceMetadataKeyId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // DEVİCE GROUPS SERVİCES

  async getDeviceGroups(params) {
    const endPoint = 'device-group'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDeviceGroups(payload) {
    const endPoint = 'device-group'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDeviceGroup(deviceGroupId) {
    const endPoint = `device-group/${deviceGroupId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateDeviceGroups(deviceGroupId, payload) {
    const endPoint = `device-group/${deviceGroupId}`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteDeviceGroups(deviceGroupId) {
    const endPoint = `device-group/${deviceGroupId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // DEVİCE GROUPS RELATIONS SERVİCES

  async getDeviceGroupRelations(params) {
    const endPoint = 'device-group-relation'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDeviceGroupRelations(payload) {
    const endPoint = 'device-group-relation'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDeviceGroupRelation(deviceGroupRelationId) {
    const endPoint = `device-group-relation/${deviceGroupRelationId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getDeviceGroupRelationByDeviceId(deviceId) {
    const endPoint = `device-group-relation/findByDeviceId/${deviceId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateDeviceGroupRelation(payload) {
    const endPoint = `device-group-relation`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteDeviceGroupRelation(deviceGroupRelationId) {
    const endPoint = `device-group-relation/${deviceGroupRelationId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // DEVICE VEHICLE RELATION SERVICES

  async getDeviceVehicleRelations(params) {
    const endPoint = 'device-vehicle-relation'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveDeviceVehicleRelations(payload) {
    const endPoint = 'device-vehicle-relation'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getDeviceVehicleRelation(deviceVehicleRelationId) {
    const endPoint = `device-vehicle-relation/${deviceVehicleRelationId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getDeviceVehicleRelationByDeviceId(deviceId) {
    const endPoint = `device-vehicle-relation/findVehicleByDeviceId/${deviceId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateDeviceVehicleRelations(deviceVehicleRelationId, payload) {
    const endPoint = `device-vehicle-relation/${deviceVehicleRelationId}`
    const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteDeviceVehicleRelations(deviceVehicleRelationId) {
    const endPoint = `device-vehicle-relation/${deviceVehicleRelationId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },
  async getVehicles(params) {
    const endPoint = 'vehicle'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  }
}

export default service