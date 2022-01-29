import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'

const service = {
    async getObservers(params) {
        const endPoint = "observer"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async getObserversWithFilter(params){
        const endPoint = "observer/findByLikeIgnoreCase"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },
    
    async saveObserver(payload) {
        const endPoint = "observer"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getObserver(observerId) {
        const endPoint = `observer/${observerId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateObserver(payload) {
        const endPoint = `observer`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteObserver(observerId) {
        const endPoint = `observer/${observerId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },

    async getUsers(params){
        const endPoint = "user"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async getObserverVehicles(params) {
        const endPoint = "observer-vehicle"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveObserverVehicle(payload) {
        const endPoint = "observer-vehicle"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getObserverVehicle(observerId) {
        const endPoint = `observer-vehicle/${observerId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateObserverVehicle(payload) {
        const endPoint = `observer-vehicle`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteObserverVehicle(observerId) {
        const endPoint = `observer-vehicle/${observerId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },

    async getVehicles(params){
        const endPoint = "vehicle"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async getObserverDrivers(params) {
        const endPoint = "observer-driver"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveObserverDriver(payload) {
        const endPoint = "observer-driver"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getObserverDriver(observerId) {
        const endPoint = `observer-driver/${observerId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateObserverDriver(payload) {
        const endPoint = `observer-driver`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteObserverDriver(observerId) {
        const endPoint = `observer-driver/${observerId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },

    async getObserverDriverAccessPrivileges(params){
        const endPoint = "observer-driver-access-privilege"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveObserverDriverAccessPrivilege(payload) {
        const endPoint = "observer-driver-access-privilege"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getObserverDriverAccessPrivilege(observerId) {
        const endPoint = `observer-driver-access-privilege/${observerId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateObserverDriverAccessPrivilege(payload) {
        const endPoint = `observer-driver-access-privilege`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteObserverVehicleAccessPrivilege(observerId) {
        const endPoint = `observer-vehicle-access-privilege/${observerId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },

    async getObserverVehicleAccessPrivileges(params){
        const endPoint = "observer-vehicle-access-privilege"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveObserverVehicleAccessPrivilege(payload) {
        const endPoint = "observer-vehicle-access-privilege"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getObserverVehicleAccessPrivilege(observerId) {
        const endPoint = `observer-vehicle-access-privilege/${observerId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateObserverVehicleAccessPrivilege(payload) {
        const endPoint = `observer-vehicle-access-privilege`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteObserverVehicleAccessPrivilege(observerId) {
        const endPoint = `observer-vehicle-access-privilege/${observerId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    }
}

export default service