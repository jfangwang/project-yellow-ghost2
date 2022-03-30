export const RESIZE = "global/resize"
export const CHANGE_TO_INDEX = "global/changeToIndex"

export function resize() {
  return {
    type: RESIZE
  }
}
export function changeToIndex(index) {
  return {
    type: CHANGE_TO_INDEX,
    index: index
  }
}