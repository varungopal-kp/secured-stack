import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import {
  loginSuccess,
  loginError,
  registerError,
  registerSuccess,
} from "../actions/auth";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/auth";

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

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginCall);
  yield takeEvery(REGISTER_REQUEST, registerCall);
}

export default authSaga;
