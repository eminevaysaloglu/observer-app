import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'

const service = {
  async getEntities(params) {
    const endPoint = 'entity'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getEntitiesWithFilterData(params) {
    const endPoint = `entity/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveEntity(payload) {
    const endPoint = 'entity'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntity(entityId) {
    const endPoint = `entity/${entityId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateEntity(payload) {
    const endPoint = `entity`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteEntity(entityId) {
    const endPoint = `entity/${entityId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async getEntityContactes(params) {
    const endPoint = 'entity-contact'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getEntityGroups(params) {
    const endPoint = 'entity-group'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveEntityGroup(payload) {
    const endPoint = 'entity-group'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntityGroup(entityGroupId) {
    const endPoint = `entity-group/${entityGroupId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateEntityGroup(payload) {
    const endPoint = `entity-group`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteEntityGroup(entityGroupId) {
    const endPoint = `entity-group/${entityGroupId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async getEntityContact(params) {
    const endPoint = 'entity-contact'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveEntityContact(payload) {
    const endPoint = 'entity-contact'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntityContact(entityContactId) {
    const endPoint = `entity-contact/${entityContactId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateEntityContact(payload) {
    const endPoint = `entity-contact`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getUsers(params) {
    const endPoint = 'user'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getVehicles(params) {
    const endPoint = 'vehicle'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getEntityLocations(params) {
    const endPoint = 'entity-location'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveEntityLocation(payload) {
    const endPoint = 'entity-location'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntityLocation(entityLocationId) {
    const endPoint = `entity-location/${entityLocationId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateEntityLocation(payload) {
    const endPoint = `entity-location`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntityGroupRelations(params) {
    const endPoint = 'entity-group-relation'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveEntityGroupRelation(payload) {
    const endPoint = 'entity-group-relation'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntityGroupRelation(entityGroupRelationId) {
    const endPoint = `entity-group-relation/${entityGroupRelationId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateEntityGroupRelation(payload) {
    const endPoint = `entity-group-relation`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteEntityGroupRelation(entityGroupRelationId) {
    const endPoint = `entity-group-relation/${entityGroupRelationId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async getEntityTypes(params) {
    const endPoint = 'entity-type'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveEntityType(payload) {
    const endPoint = 'entity-type'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getEntityType(entityTypeId) {
    const endPoint = `entity-type/${entityTypeId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateEntityType(payload) {
    const endPoint = `entity-type`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getUserAddresses(params) {
    const endPoint = 'user-address'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  }
}

export default service
