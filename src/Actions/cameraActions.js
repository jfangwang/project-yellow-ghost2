export const TOGGLE_FACING_MODE = 'camera/toggleFacingMode';
export const SET_CAMERA_PERMISSIONS = 'camera/setCameraPermissions';
export const SET_SCREEN = 'camera/setScreen';
export const CAPTURED_IMAGE = 'camera/capturedImage';

/**
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

/**
 * @export
 * @param {*} screen
 * @return {*}
 */
export function setScreen(screen) {
  return {
    type: SET_SCREEN,
    screen: screen,
  };
}

/**
 * @export
 * @param {*} image
 * @return {*}
 */
export function captureImage(image) {
  return {
    type: CAPTURED_IMAGE,
    capturedImage: image,
  };
}
