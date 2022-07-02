import * as type from "../constants/auth";

const isAuthorised = localStorage.getItem("isAuthorised") || "";

const initialState = {
  isAuthorised: isAuthorised,
  loading: false,
  error: null,
  logout: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthorised: false,
      };
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorised: true,
        loading: false,
      };
    case type.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case type.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthorised: false,
      };
    case type.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthorised: true,
      };
    case type.REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
