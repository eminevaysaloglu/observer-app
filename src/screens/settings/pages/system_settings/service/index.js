import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'
import { NotificationManager } from 'react-notifications';

const service = {
    async getSystemSettings(params) {
        const endPoint = "system-setting"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async updateSettings(payload){
        const endPoint = `system-setting`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    }
}

export default service