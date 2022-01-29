import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
  async getPermissions(params) {
    const endPoint = 'permission'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getPermission(permissionId) {
    const endPoint = `permission/${permissionId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getRoles(params) {
    const endPoint = 'role'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getRole(roleId) {
    const endPoint = `role/${roleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveRole(payload) {
    const endPoint = 'role'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteRole(roleId) {
    const endPoint = `role/${roleId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async updateRole(payload) {
    const endPoint = `role-permission`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async getRolePermissions(params) {
    const endPoint = 'role-permission'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getRolePermission(roleId) {
    const endPoint = `role-permission/${roleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveRolePermission(payload) {
    const endPoint = 'role-permission'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteRolePermission(roleId) {
    const endPoint = `role-permission/${roleId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },

  async updateRolePermission(payload) {
    const endPoint = `role-permission`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async findAllByRoleIdAndWithPermission(roleId) {
    const endPoint = `role-permission/findAllByRoleIdAndWithPermission/${roleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async findAllByRoleId(roleId) {
    
  },

  // USER- ROLES SERVICES

  async getUserRoles(params) {
    const endPoint = 'user-role'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserRolesWithFilterDate(params) {
    const endPoint = `user-role/findByLikeIgnoreCase`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  },

  async getUserRole(userRoleId) {
    const endPoint = `user-role/${userRoleId}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async saveUserRoles(payload) {
    const endPoint = 'user-role'
    const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },

  async deleteUserRole(userRoleId) {
    const endPoint = `user-role/${userRoleId}`
    const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, 'Bearer')
    return result
  },
  async updateUserRoles(payload) {
    const endPoint = `user-role`
    const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, 'Bearer')
    return result
  },
  async getUsers(params) {
    const endPoint = 'user'
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, 'Bearer')
    return result
  }
}

export default service
