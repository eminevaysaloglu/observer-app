import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'

const service = {
  async saveUser(payload) {
    const endPoint = `signup`
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getUsersWithFilter(params) {
    const endPoint = `user/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUsers(params) {
    const endPoint = 'user'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUser(userId) {
    const endPoint = `user/${userId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateUser(payload) {
    const endPoint = `user`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async findByLike(filterEP, value, params) {
    const endPoint = filterEP !== 'id' ? `user/${filterEP}/${value}` : `user/${value}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserAddresses(params) {
    const endPoint = 'user-address'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async saveUserAddress(payload) {
    const endPoint = 'user-address'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getUserAddress(userAddressId) {
    const endPoint = `user-address/${userAddressId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getUserAddressByUserId(userId) {
    const endPoint = `user-address/findAllByUserId/${userId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateUserAddress(payload) {
    const endPoint = `user-address`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteUserAddress(userAddressId) {
    const endPoint = `user-address/${userAddressId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async getUserAccounts(params) {
    const endPoint = 'user-account'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserAccount(userAccountId) {
    const endPoint = `user-account/${userAccountId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async updateUserAccount(payload) {
    const endPoint = `user-account`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getUserAccountProperties(params) {
    const endPoint = 'user-account-property'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserAccountProperty(userAccountPropertyId) {
    const endPoint = `user-account-property/${userAccountPropertyId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveUserAccountProperty(payload) {
    const endPoint = 'user-account-property'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteUserAccountProperty(userAccountPropertyId) {
    const endPoint = `user-account-property/${userAccountPropertyId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async updateUserAccountProperty(payload) {
    const endPoint = `user-account-property`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getKeys(params) {
    const endPoint = 'user-account-property-key'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getAccounts(params) {
    const endPoint = 'user-account'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserAccountResrictions(params) {
    const endPoint = 'user-account-restriction'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserAccountRestriction(userAccountPropertyId) {
    const endPoint = `user-account-restriction/${userAccountPropertyId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getUserAccountRestrictionByUserId(userId) {
    const endPoint = `user-account-restriction/findAllByUserAccountId/${userId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveUserAccountRestriction(payload) {
    const endPoint = 'user-account-restriction'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteUserAccountRestriction(userAccountPropertyId) {
    const endPoint = `user-account-restriction/${userAccountPropertyId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async updateUserAccountRestriction(payload) {
    const endPoint = `user-account-restriction`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getUserMetaDataKeys(params) {
    const endPoint = 'user-metadata-key'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserMetaDatas(params) {
    const endPoint = 'user-metadata'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserMetaData(userMetaDataId) {
    const endPoint = `user-metadata/${userMetaDataId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getUserMetaDataByUserId(userId) {
    const endPoint = `user-metadata/findByUserId/${userId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveUserMetaData(payload) {
    const endPoint = 'user-metadata'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteUserMetaData(userMetaData) {
    const endPoint = `user-metadata/${userMetaData}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async updateUserMetaData(payload) {
    const endPoint = `user-metadata`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  // USER METADATA KEY SERVICES

  async getUserMetaDataKeys(params) {
    const endPoint = 'user-metadata-key'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserMetaDataKey(userMetaDataId) {
    const endPoint = `user-metadata-key/${userMetaDataKeyId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveUserMetaDataKey(payload) {
    const endPoint = 'user-metadata-key'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteUserMetaDataKey(userMetaDataKey) {
    const endPoint = `user-metadata-key/${userMetaDataKey}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async updateUserMetaDataKey(payload) {
    const endPoint = `user-metadata-key`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  }
}

export default service