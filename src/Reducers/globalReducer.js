export const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
}
export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "global/resize":
      return {
        ...initialState,
        height: window.innerHeight,
        width: window.innerWidth,
      }
    default:
      return state
  }
}