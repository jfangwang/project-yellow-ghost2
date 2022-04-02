import {
  RESIZE,
  CHANGE_TO_INDEX,
  UPDATE_DEC_INDEX,
  TOGGLE_SLIDE,
} from '../Actions/globalActions';
export const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  index: 1,
  decIndex: 1,
  slideDisabled: false,
};

/**
 * globalReducer: Contains states any component may need from redux store.
 * @param {object} state Defaults to initialState obj
 * @param {object} action
 * @return {object}
 */
export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case RESIZE:
      return {
        ...state,
        height: window.innerHeight,
        width: window.innerWidth,
      };
    case CHANGE_TO_INDEX:
      return {
        ...state,
        height: window.innerHeight,
        width: window.innerWidth,
        index: action.index,
        decIndex: action.index,
      };
    case UPDATE_DEC_INDEX:
      return {
        ...state,
        decIndex: action.decIndex,
      };
    case TOGGLE_SLIDE:
      if (action.state) {
        return {
          ...state,
          slideDisabled: action.state,
        };
      } else {
        return {
          ...state,
          slideDisabled: !state.slideDisabled,
        };
      }
    default:
      return state;
  }
}
