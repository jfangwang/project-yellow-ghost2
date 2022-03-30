export const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  index: 1,
  dec_index: 1,
}
export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "global/resize":
      return {
        ...state,
        height: window.innerHeight,
        width: window.innerWidth,
      }
    case "global/changeToIndex":
      // console.log(action.index);
      return {
        ...state,
        height: window.innerHeight,
        width: window.innerWidth,
        index: action.index,
        dec_index: action.index,
      }
    case "global/updateDecimalIndex":
      return {
        ...state,
        dec_index: action.dec_index,
      }
    default:
      return state
  }
}