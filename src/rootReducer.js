import { assocPath, path as getIn } from 'ramda'
import getInitialState from './initialState'

const rootReducer = (state = getInitialState(), action) => {
  const { reducer, path, payload, type } = action
  // Fallback for actions from different sources
  if (!reducer) return state
  if (!path) throw new Error(`You forgot to set path in action ${type}`)
  const updatedState = reducer(getIn(path, state), payload)
  return assocPath(path, state, updatedState)
}

export default rootReducer
