import httpHelper from 'utils/httpHelper'
import { appConfig } from 'constants/appConfig'
import { NotificationManager } from 'react-notifications';

const service = {
    async getCurrencies(params) {
        const endPoint = "currency"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        if (result?.status !== 200) {
            throw new Error('Currency page not found!')
        }

        return result
    },

    async saveCurrency(payload) {
        const endPoint = "currency"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        if ( [200, 201].includes(result?.status)){
            NotificationManager.error("Para birimi eklenmedi")
        }
        return result
    },

    async getCurrency(currencyId) {
        const endPoint = `currency/${currencyId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateCurrency(payload) {
        const endPoint = `currency`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteCurrency(currencyId) {
        const endPoint = `currency/${currencyId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },

    async getMyAccount() {
        const myUserId = JSON.parse(localStorage.getItem('user')).id
        const endPoint = `user-account/${myUserId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateMyAccount(payload) {
        const endPoint = `user-account`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getMyProperties() {
        const myUserId = JSON.parse(localStorage.getItem('user')).id
        const endPoint = `user-account-property/findAllByAccountId/${myUserId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateUserAccountProperty(payload){
        const endPoint = `user-account-property`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    }
}

export default service