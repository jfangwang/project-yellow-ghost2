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
    case 'global/resize':
      return {
        ...state,
        height: window.innerHeight,
        width: window.innerWidth,
      };
    case 'global/changeToIndex':
      return {
        ...state,
        height: window.innerHeight,
        width: window.innerWidth,
        index: action.index,
        decIndex: action.index,
      };
    case 'global/updateDecimalIndex':
      return {
        ...state,
        decIndex: action.decIndex,
      };
    case 'global/toggleSlide':
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
