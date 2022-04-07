export const EDIT_USER = 'user/editUser';
export const EDIT_FAKE_DB = 'user/editFakeDB';

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

/**
 * @export
 * @param {*} fakeDB
 * @return {*}
 */
export function editFakeDB(fakeDB) {
  return {
    type: EDIT_FAKE_DB,
    fakeDB: fakeDB,
  };
}
