import axios from 'axios'
import { makeUrl, TESTNET_SEED_NODES } from '../constants'
import type { ViewObj } from '../types'
import DEBUG_URL from '$env/static/private'

let api

export const initApi = async () => {
  const { apiUrl, note } = await fetchAPIConfig()

  api = axios.create({
    baseURL: apiUrl || makeUrl(),
  })
  return { apiUrl, note }
}

async function checkAPIConnectivity(url) {
  try {
    await axios.head(url)
    return true
  } catch (error) {
    return false
  }
}

const fetchAPIConfig = async () => {
  let apiUrl = DEBUG_URL //|| makeUrl()
  let note

  if (!apiUrl) {
    try {
      const response = await axios.get(TESTNET_SEED_NODES)
      const data = response.data

      for (const node of data.nodes) {
        const url = `${node.url}/v1`
        const isConnected = await checkAPIConnectivity(url)

        if (isConnected) {
          apiUrl = url
          note = node.note
          break
        }
      }

      if (!apiUrl) {
        console.error('Failed to connect to any API URL.')
      }
    } catch (error) {
      console.error(`Failed to fetch API config: ${error}`)
    }
  }

  return { apiUrl, note }
}

export const getIndex = async () => {
  try {
    const response = await api.get('')
    return response.data
  } catch (error) {
    console.error(`Failed to get index: ${error.message}`)
    throw error
  }
}

// export const postViewFunc = async (payload: ViewObj) => {
//   try {
//     const response = await api.post('/view', payload)
//     return response.data
//   } catch (error) {
//     // TODO: log errors
//     console.error(`Failed to get view ${payload.function}, message: ${error.message}`)
//     throw error
//   }
// }
export const postViewFunc = async (payload: ViewObj) => {
  return await api
    .post('/view', payload)
    .then((r) => {
      return r.data
    })
    .catch((e) => {
      console.error(`Failed to get view ${payload}, message: ${e.message}`)
      throw e
    })
  //   return response.data
  // } catch (error) {
  //   // TODO: log errors
  //   console.error(`Failed to get view ${payload.function}, message: ${error.message}`)
  //   throw error
  // }
}
export const getAccountResource = async (account: string, struct_path: string) => {
  return await api
    .get(`/accounts/${account}/resource/${struct_path}`)
    .then((r) => {
      return r.data.data
    })
    .catch((e) => {
      console.error(`Failed to get resource ${struct_path}, message: ${e.message}`)
      throw e
    })
}
