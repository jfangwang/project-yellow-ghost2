import {
  TOGGLE_FACING_MODE,
  SET_CAMERA_PERMISSIONS,
  SET_SCREEN,
  CAPTURED_IMAGE,
} from '../Actions/cameraActions';
export const initialState = {
  facingMode: 'user',
  cameraPermissions: true,
  screen: 'camera',
  capturedImage: null,
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
    case CAPTURED_IMAGE:
      return {
        ...state,
        capturedImage: action.capturedImage,
      };
    default:
      return state;
  }
}
