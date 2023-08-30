import { getIndex } from './index'
import { getView } from './api'
import { VALIDATOR_PAYLOAD, VDF_DIFFICULTY, validatorList, vdfDifficulty } from './query_view'

export const refresh = () => {
  getIndex()
  getView(VALIDATOR_PAYLOAD).then((r) => validatorList.set(r[0]))
  getView(VDF_DIFFICULTY).then((r) => vdfDifficulty.set(r))
  // ... add more views here
}
