import { client } from '../generated/client.gen'
import axiosInstance from './instance'

client.setConfig({
  axios: axiosInstance,
})
