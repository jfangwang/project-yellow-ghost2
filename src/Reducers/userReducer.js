export const initialState = {
  user: {},
  isUserLoggedIn: false,
}
export function userReducer(state = initialState, action) {
  switch(action.type) {
    case "user/login":
      return {
        ...initialState,
        isUserLoggedIn: true,
      }
    case "user/logout":
      return state
    default:
      return state
  }
}