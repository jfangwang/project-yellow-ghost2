import {Guest} from '../Assets/data/GuestInfo';
export const initialState = {
  user: Guest,
  isUserLoggedIn: false,
};

/**
 * userReducer: Contains user's states any component may need from redux store.
 * @param {object} state Defaults to initialState obj
 * @param {object} action
 * @return {object}
 */
export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/login':
      return {
        ...initialState,
        isUserLoggedIn: true,
      };
    case 'user/logout':
      return state;
    default:
      return state;
  }
}
