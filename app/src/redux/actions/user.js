import * as type from "../constants/user";

export function getUsers(data) {
  return {
    type: type.GET_USER_REQUEST,
    payload: data,
  };
}
export function getUsersSuccess(data) {
  return {
    type: type.GET_USER_SUCCESS,
    payload: data,
  };
}
export function getUsersError(data) {
  return {
    type: type.GET_USER_FAILED,
    payload: data,
  };
}

