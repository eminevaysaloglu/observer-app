import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'

const service = {

// TEAMS SERVICES

    async getTeams(params) {
        const endPoint = "team"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveTeams(payload) {
        const endPoint = "team"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getTeam(teamId) {
        const endPoint = `team/${teamId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateTeams(payload) {
        const endPoint = `team`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteTeams(teamId) {
        const endPoint = `team/${teamId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },
    async getTeamStatus(status) {
        const endPoint = `team/findAllByStatus/${status}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

// TEAM AUTHORITIES SERVICES

    async getTeamAuthorities(params) {
        const endPoint = "team-authority"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveTeamAuthorities(payload) {
        const endPoint = "team-authority"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getTeamAuthority(teamAuthorityId) {
        const endPoint = `team-authority/${teamAuthorityId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateTeamAuthorities(payload) {
        const endPoint = `team-authority`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteTeamAuthorities(teamAuthorityId) {
        const endPoint = `team-authority/${teamAuthorityId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },
    async getUsers(params) {
        const endPoint = "user"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

// TEAM VEHICLES SERVICES

    async getTeamVehicles(params) {
        const endPoint = "team-vehicle"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveTeamVehicles(payload) {
        const endPoint = "team-vehicle"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getTeamVehicle(teamVehicleId) {
        const endPoint = `team-vehicle/${teamVehicleId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateTeamVehicles(payload) {
        const endPoint = `team-vehicle`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteTeamVehicles(teamVehicleId) {
        const endPoint = `team-vehicle/${teamVehicleId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },
    async getVehicles(params) {
        const endPoint = "vehicle"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

// TEAM DRIVERS SERVICES

    async getTeamDrivers(params) {
        const endPoint = "team-driver"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveTeamDrivers(payload) {
        const endPoint = "team-driver"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getTeamDriver(teamDriverId) {
        const endPoint = `team-driver/${teamDriverId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateTeamDrivers(payload) {
        const endPoint = `team-driver`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteTeamDrivers(teamDriverId) {
        const endPoint = `team-driver/${teamDriverId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },

// TEAM ENTITIES

    async getTeamEntities(params) {
        const endPoint = "team-entity"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

    async saveTeamEntities(payload) {
        const endPoint = "team-entity"
        const result = await httpHelper.makePostRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async getTeamEntity(teamEntityId) {
        const endPoint = `team-entity/${teamEntityId}`
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, {}, "Bearer")
        return result
    },

    async updateTeamEntities(payload) {
        const endPoint = `team-entity`
        const result = await httpHelper.makePutRequest(appConfig.baseUrl, endPoint, payload, "Bearer")
        return result
    },

    async deleteTeamEntities(teamEntityId) {
        const endPoint = `team-entity/${teamEntityId}`
        const result = await httpHelper.makeDeleteRequest(appConfig.baseUrl, endPoint, "Bearer")
        return result
    },
    async getEntities(params) {
        const endPoint = "entity"
        const result = await httpHelper.makeGetRequest(appConfig.baseUrl, endPoint, params, "Bearer")
        return result
    },

}

export default service