import httpHelper from '../../../../utils/httpHelper'
import { appConfig } from '../../../../constants/appConfig'
import axios from 'axios'

const services = {
  async findAllByDeviceIdAndDeviceTimeBetween(params, token) {
    const endPoint = 'location-data/findAllByDeviceIdAndDeviceTimeBetween'

    const headers = {
      'content-type': 'application/json',
      Authorization: token
    }

    const options = {
      baseURL: appConfig.baseUrl,
      headers,
      timeout: 10000
    }

    const instance = axios.create(options)
    let url = `${endPoint}`
        
    const result = await instance.get(url, {params}).catch((error) => {
      console.error(error)
    })
    return result
  }
}

export default services
