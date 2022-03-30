export const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  index: 1,
}
export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "global/resize":
      return {
        ...initialState,
        height: window.innerHeight,
        width: window.innerWidth,
      }
    case "global/changeToIndex":
      // console.log(action.index);
      return {
        ...initialState,
        height: window.innerHeight,
        width: window.innerWidth,
        index: action.index
      }
    default:
      return state
  }
}