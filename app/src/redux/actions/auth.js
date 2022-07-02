import * as type from "../constants/auth";

export function login(data) {
  return {
    type: type.LOGIN_REQUEST,
    payload: data,
  };
}
export function loginSuccess(data) {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
}
export function loginError(data) {
  return {
    type: type.LOGIN_FAILED,
    payload: data,
  };
}

export function register(data) {
  return {
    type: type.REGISTER_REQUEST,
    payload: data,
  };
}
export function registerSuccess(data) {
  return {
    type: type.REGISTER_SUCCESS,
    payload: data,
  };
}
export function registerError(data) {
  return {
    type: type.REGISTER_FAILED,
    payload: data,
  };
}

export function logout() {
  return {
    type: type.LOGOUT_REQUEST,
  };
}
export function logoutSuccess(data) {
  return {
    type: type.LOGOUT_SUCCESS,
    payload: data,
  };
}
export function logoutError(data) {
  return {
    type: type.LOGOUT_FAILED,
    payload: data,
  };
}
