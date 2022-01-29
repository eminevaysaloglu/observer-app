import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'
import { NotificationManager } from 'react-notifications';

const service = {
    async getDeviceDataLogs(params){
        const endPoint = "device-data-log"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async getDevices(){
        const endPoint = "device"
        const params = {
            page: 0,
            size: 9999
        }
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async findByDeviceId(params) {
        const endPoint = "device-data-log/findByDeviceId"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async findByDeviceIdAndAndDeviceTimeBetween(params) {
        const endPoint = "device-data-log/findByDeviceIdAndAndDeviceTimeBetween"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    }
}

export default service