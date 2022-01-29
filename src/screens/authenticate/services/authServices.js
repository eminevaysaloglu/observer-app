import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

export const authService = {
  async token(payload) {
    const result = await httpHelper.makePostRequest(appConfig.tokenUrl, '/token', payload)
    return result
  },

  async login(payload) {
    const endPoint = `/user-account/findByUserId/${payload.username}`
    const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, 'Bearer')
    return result
  },

  async getPermissions(payload) {
    const userRoleEndPoint = `/user-role/findAllByUserId/${payload.username}`
    const resultRole = await httpHelper.makeGetRequest(appConfig.baseUrl, userRoleEndPoint, {}, 'Bearer')
    const roleId = resultRole?.data?.data[0]?.role.id

    const permissionEndPoint = `/role-permission/findAllByRoleId/${roleId}`
    const resultPermissions = await httpHelper.makeGetRequest(appConfig.baseUrl, permissionEndPoint, {}, 'Bearer')
    
    return resultPermissions
  }
}
