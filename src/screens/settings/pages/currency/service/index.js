import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'

const service = {
    async getCurrencies(params) {
        const endPoint = "currency"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveCurrency(payload) {
        const endPoint = "currency"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getCurrency(currencyId) {
        const endPoint = `currency/${currencyId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        if (result?.status !== 200) {
            throw new Error('Currency 404 not found')
        }

        return result
    },

    async updateCurrency(currencyId, payload) {
        const endPoint = `currency/${currencyId}`
        const result = await httpHelper.makePatchRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteCurrency(currencyId) {
        const endPoint = `currency/${currencyId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    }
}

export default service