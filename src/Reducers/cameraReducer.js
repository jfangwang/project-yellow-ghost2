import {
  TOGGLE_FACING_MODE,
  SET_CAMERA_PERMISSIONS,
  SET_SCREEN,
} from '../Actions/cameraActions';
export const initialState = {
  facingMode: 'user',
  cameraPermissions: true,
  screen: 'camera',
};


/**
 *
 *
 * @export
 * @param {*} [state=initialState]
 * @param {*} action
 * @return {*}
 */
export function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FACING_MODE:
      if (action.facingMode) {
        return {
          ...state,
          facingMode: action.facingMode,
        };
      } else if (state.facingMode === 'environment') {
        return {
          ...state,
          facingMode: 'user',
        };
      } else {
        return {
          ...state,
          facingMode: 'environment',
        };
      }
    case SET_CAMERA_PERMISSIONS:
      return {
        ...state,
        cameraPermissions: action.cameraPermissions,
      };
    case SET_SCREEN:
      return {
        ...state,
        screen: action.screen,
      };
    default:
      return state;
  }
}
