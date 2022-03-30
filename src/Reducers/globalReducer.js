export const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  index: 1,
  dec_index: 1,
  slide_disabled: false,
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
    case "global/toggleSlide":
      if (action.state) {
        return {
          ...state,
          slide_disabled: action.state
        }
      } else {
        return {
          ...state,
          slide_disabled: !state.slide_disabled
        }
      }
    default:
      return state
  }
}