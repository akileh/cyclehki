export default function routes(state = { scene: {} }, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case 'focus':
      return Object.assign({}, state, {
        scene: action.scene
      })
    default:
      return state
  }
}
