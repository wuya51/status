import { api } from './api'
import { indexStore } from './queries'

export const getIndex = async () => {
  return api.get('').then((r) => {
    indexStore.set(r.data)
    r.data
  })
}
