import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const services = {
  //  VEHICLES SERVICES

  async getVehicles(params) {
    const endPoint = 'vehicle'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getVehiclesWithFilter(params) {
    const endPoint = `vehicle/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveVehicle(payload) {
    const endPoint = 'vehicle'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicle(vehicleId) {
    const endPoint = `vehicle/${vehicleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateVehicle(payload) {
    const endPoint = `vehicle`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteVehicle(vehicleId) {
    const endPoint = `vehicle/${vehicleId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async findByLike(filterEP, value, params) {
    const endPoint = filterEP !== 'id' ? `vehicle/${filterEP}/${value}` : `vehicle/${value}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async findByPlateVehicle(payload) {
    const endPoint = `vehicle/search/findByPlate`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async findByLikeIgnoreCase(params) {
    const endPoint = `vehicle/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, { ...params, status: 'ACTIVE' }, 'Bearer')
    return result
  },

  // VEHICLE METADATA SERVICES

  async getVehiclesMetadata(payload) {
    const endPoint = 'vehicle-metadata'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async saveVehicleMetadata(payload) {
    const endPoint = 'vehicle-metadata'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicleMetadata(vehicleMetadataId) {
    const endPoint = `vehicle-metadata/${vehicleMetadataId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getVehicleMetadataByVehicleId(vehicleId) {
    const endPoint = `vehicle-metadata/findByVehicleId/${vehicleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateVehicleMetadata(payload) {
    const endPoint = `vehicle-metadata`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteVehicleMetadata(vehicleMetadataId) {
    const endPoint = `vehicle-metadata/${vehicleMetadataId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async findByPlateVehicleMetadata(payload) {
    const endPoint = `vehicle/search/findByPlate`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // VEHICLE METADATA KEYS SERVICES

  async getVehicleMetadataKeys(params) {
    const endPoint = `vehicle-metadata-key`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },
  async saveVehicleMetadataKey(payload) {
    const endPoint = 'vehicle-metadata-key'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicleMetadataKey(vehicleMetadataKeyId) {
    const endPoint = `vehicle-metadata-key/${vehicleMetadataKeyId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },
  async updateVehicleMetadataKey(payload) {
    const endPoint = `vehicle-metadata-key`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteVehicleMetadataKey(vehicleMetadataKeyId) {
    const endPoint = `vehicle-metadata-key/${vehicleMetadataKeyId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  // VEHICLE GROUP SERVICES

  async getVehicleGroups(params) {
    const endPoint = 'vehicle-group'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveVehicleGroups(payload) {
    const endPoint = 'vehicle-group'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicleGroup(vehicleGroupId) {
    const endPoint = `vehicle-group/${vehicleGroupId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateVehicleGroups(payload) {
    const endPoint = `vehicle-group`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteVehicleGroups(vehicleGroupId) {
    const endPoint = `vehicle-group/${vehicleGroupId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async findByPlateVehicleGroups(payload) {
    const endPoint = `vehicle/search/findByPlate`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // VEHICLE GROUP RELATION SERVICES

  async getVehicleGroupRelations(params) {
    const endPoint = 'vehicle-group-relation'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveVehicleGroupRelations(payload) {
    const endPoint = 'vehicle-group-relation'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getVehicleGroupRelation(vehicleGroupRelationId) {
    const endPoint = `vehicle-group-relation/${vehicleGroupRelationId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getVehicleGroupByVehicleId(vehicleId) {
    const endPoint = `vehicle-group-relation/findByVehicleId/${vehicleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateVehicleGroupRelations(payload) {
    const endPoint = `vehicle-group-relation`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteVehicleGroupRelations(vehicleGroupRelationId) {
    const endPoint = `vehicle-group-relation/${vehicleGroupRelationId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  }
}

export default services
