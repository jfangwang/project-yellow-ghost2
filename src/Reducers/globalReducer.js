import {
  RESIZE,
  CHANGE_TO_INDEX,
  UPDATE_DEC_INDEX,
  TOGGLE_SLIDE,
  SET_ORIENTATION,
} from '../Actions/globalActions';
export const initialState = {
  height: window.innerHeight,
  width: window.innerWidth,
  index: 1,
  decIndex: 1,
  slideDisabled: false,
  orientation: null,
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
      if (window.innerHeight >= window.innerWidth) {
        return {
          ...state,
          height: window.innerHeight,
          width: window.innerWidth,
          orientation: 'portrait',
        };
      } else {
        return {
          ...state,
          height: window.innerHeight,
          width: window.innerWidth,
          orientation: 'landscape',
        };
      }
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
    case SET_ORIENTATION:
      return {
        ...state,
        orientation: action.orientation,
      };
    default:
      return state;
  }
}
