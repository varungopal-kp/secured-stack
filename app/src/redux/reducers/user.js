import * as type from "../constants/user";

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case type.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        users: [],
      };
    case type.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.data.data,
        loading: false,
      };
    case type.GET_USER_FAILED:      
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
