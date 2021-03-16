import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  data: null,
  error: null,
  loading: false
};

const orderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const orderSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false
  });
};

const orderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    data: null,
    loading: false
  });
};

const orderLogout = (state, action) => {
  return updateObject(state, {
    data: null
  });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return orderStart(state, action);
    case actionTypes.ORDER_SUCCESS:
      return orderSuccess(state, action);
    case actionTypes.ORDER_FAIL:
      return orderFail(state, action);
    case actionTypes.ORDER_LOGOUT:
      return orderLogout(state, action);
    default:
      return state;
  }
};

export default orderReducer;
