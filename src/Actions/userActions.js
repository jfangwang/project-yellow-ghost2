export const EDIT_USER = 'user/editUser';

/**
 * @export
 * @param {*} user
 * @return {*}
 */
export function editUser(user) {
  return {
    type: EDIT_USER,
    user: user,
  };
}
