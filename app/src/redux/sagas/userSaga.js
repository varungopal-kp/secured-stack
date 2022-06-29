import { put, takeEvery } from "redux-saga/effects";
import axios from "../../utilities/axios-config";
import { getUsersSuccess, getUsersError } from "../actions/user";
import { GET_USER_REQUEST } from "../constants/user";

function* userCall({ payload }) {
  try {
    const login = yield axios
      .get(`users/getAll`, payload)
      .then((res) => {
        return res;
      })
      .catch(function (response) {
        return Promise.reject(response);
      });
    yield put(getUsersSuccess(login));
  } catch (error) {
    yield put(getUsersError(error));
  }
}

function* userSaga() {
  yield takeEvery(GET_USER_REQUEST, userCall);
}

export default userSaga;
