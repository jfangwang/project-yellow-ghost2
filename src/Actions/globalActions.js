export const RESIZE = "global/resize"
export const CHANGE_TO_INDEX = "global/changeToIndex"
export const UPDATE_DEC_INDEX = "global/updateDecimalIndex"
export const TOGGLE_SLIDE = "global/toggleSlide"

export function resize() {
  return {
    type: RESIZE
  }
}
export function changeToIndex(index) {
  return {
    type: CHANGE_TO_INDEX,
    index: index,
  }
}
export function updateDecimalIndex(dec_index) {
  return {
    type: UPDATE_DEC_INDEX,
    dec_index: dec_index,
  }
}
export function toggleSlide(state) {
  return {
    type: TOGGLE_SLIDE,
    state: state,
  }
}