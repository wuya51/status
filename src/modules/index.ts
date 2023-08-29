
import { writable } from 'svelte/store'
import { api } from './api'
import { apiError } from './error'
// get the index with metadata
export const indexStore = writable<object>()
export const getIndex = async () => {
  return api.get('').then((r) => {
    indexStore.set(r.data)
    r.data
  })
  .catch((e) => {
    apiError.set(e)
  });
}
