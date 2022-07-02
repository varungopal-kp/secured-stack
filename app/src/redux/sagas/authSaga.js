import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import {
  loginSuccess,
  loginError,
  registerError,
  registerSuccess,
  logoutSuccess,
  logoutError,
} from "../actions/auth";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
} from "../constants/auth";

function* loginCall({ payload }) {
  try {
    const login = yield axios
      .post(`auth/login`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(loginSuccess(login));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* registerCall({ payload }) {
  try {
    const token = yield axios
      .post(`auth/register`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(registerSuccess(token));
  } catch (error) {
    yield put(registerError(error));
  }
}

function* logoutCall({ payload }) {
  try {
    const login = yield axios
      .post(`auth/logout`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    localStorage.setItem("isAuthorised", "");
    yield (window.location = "/auth");
  } catch (error) {
    localStorage.setItem("isAuthorised", "");
    yield (window.location = "/auth");
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginCall);
  yield takeEvery(REGISTER_REQUEST, registerCall);
  yield takeEvery(LOGOUT_REQUEST, logoutCall);
}

export default authSaga;
