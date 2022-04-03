export const TOGGLE_FACING_MODE = 'camera/toggleFacingMode';
export const SET_CAMERA_PERMISSIONS = 'camera/setCameraPermissions';


/**
 *
 *
 * @export
 * @param {*} faceMode
 * @return {*}
 */
export function toggleFacingMode(faceMode) {
  return {
    type: TOGGLE_FACING_MODE,
    facingMode: faceMode,
  };
}


/**
 *
 *
 * @export
 * @param {*} cameraPermissions
 * @return {*}
 */
export function setCameraPermissions(cameraPermissions) {
  return {
    type: SET_CAMERA_PERMISSIONS,
    cameraPermissions: cameraPermissions,
  };
}
