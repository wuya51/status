import axios from 'axios'
import { makeUrl, TESTNET_SEED_NODES } from '../constants'
import type { ViewObj } from '../types'

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
  let apiUrl = import.meta.env.VITE_API_URL || makeUrl()
  let note

  if (!apiUrl) {
    try {
      const response = await axios.get(TESTNET_SEED_NODES)
      const data = response.data

      for (const node of data.nodes) {
        const isConnected = await checkAPIConnectivity(node.url)

        if (isConnected) {
          apiUrl = node.url
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

export const getView = async (payload: ViewObj) => {
  try {
    const response = await api.post('/view', payload)
    return response.data
  } catch (error) {
    // TODO: log errors
    console.error(`Failed to get view ${payload.function}, message: ${error.message}`)
    throw error
  }
}
