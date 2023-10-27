import axios from 'axios'
import { TESTNET_SEED_NODES } from '../constants'
import type { ViewObj } from '../types'
import { apiUrl, apiUrlNote } from '../store'

const DEBUG_URL: string = "http://134.209.32.159:8080/v1"

export let api

export const initApi = async () => {
  const { url, note } = await fetchAPIConfig()

  api = axios.create({
    baseURL: url,
  })
  apiUrl.set(url)
  apiUrlNote.set(note)

  return { apiUrl, note }
}

export const setApi = (url: string) => {
  api = axios.create({
    baseURL: url,
  })
  apiUrl.set(url)
  apiUrlNote.set('override')
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
  let url = DEBUG_URL
  let note

  if (!url) {
    try {
      const response = await axios.get(TESTNET_SEED_NODES)
      const data = response.data

      for (const node of data.nodes) {
        const formatted_u = `${node.url}/v1`
        const isConnected = await checkAPIConnectivity(formatted_u)

        if (isConnected) {
          url = formatted_u
          note = node.note
          break
        }
      }

      if (!url) {
        console.error('Failed to connect to any API URL.')
      }
    } catch (error) {
      console.error(`Failed to fetch API config: ${error}`)
    }
  }

  return { url, note }
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

export const postViewFunc = async (payload: ViewObj) => {
  return await api
    .post('/view', payload)
    .then((r) => {
      return r.data
    })
    .catch((e) => {
      console.error(`Failed to get view ${payload}, message: ${e.message}`)
    })
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
