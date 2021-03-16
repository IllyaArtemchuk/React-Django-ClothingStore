import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  userData: null,
  error: null,
  loading: false
};

const userStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const userSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    userData: action.userData,
    loading: false
  });
};

const userFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    userData: null,
    loading: false
  });
};

const userLogout = (state, action) => {
  return updateObject(state, {
    userData: null
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return userStart(state, action);
    case actionTypes.USER_SUCCESS:
      return userSuccess(state, action);
    case actionTypes.USER_FAIL:
      return userFail(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogout(state, action);
    default:
      return state;
  }
};

export default userReducer;
