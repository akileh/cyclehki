import { ActionConst } from 'react-native-router-flux'

const defaultState = {
  scene: {}
}

export default function routes(state = defaultState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return Object.assign({}, state, {
        scene: action.scene
      })
    default:
      return state
  }
}
