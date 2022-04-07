import {Guest, Everyone} from '../Assets/data/GuestInfo';
import {
  EDIT_USER,
} from '../Actions/userActions';
export const initialState = {
  user: Guest,
  everyone: Everyone,
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
        ...state,
        isUserLoggedIn: true,
      };
    case 'user/logout':
      return initialState;
    case EDIT_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
