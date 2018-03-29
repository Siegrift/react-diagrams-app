import getInitialState from './initialState'
import { setIn, getIn } from 'immutable'

const rootReducer = (state = getInitialState(), action) => {
  const { reducer, path, payload, type } = action
  if (!reducer) return state // fallback for actions from different sources
  if (!path) throw new Error(`You forgot to set path in action ${type}`)
  const updatedState = reducer(getIn(state, path), payload)
  return setIn(state, path, updatedState)
}

export default rootReducer
