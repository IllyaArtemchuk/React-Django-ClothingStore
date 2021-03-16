import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  cartData: null,
  error: null,
  loading: false
};

const cartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const cartSuccess = (state, action) => {
  return updateObject(state, {
    cartData: action.cartData,
    error: null,
    loading: false
  });
};

const cartFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    cartData: null,
    loading: false
  });
};

const cartLogout = (state, action) => {
  return updateObject(state, {
    cartData: null
  });
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_START:
      return cartStart(state, action);
    case actionTypes.CART_SUCCESS:
      return cartSuccess(state, action);
    case actionTypes.CART_FAIL:
      return cartFail(state, action);
    case actionTypes.CART_LOGOUT:
      return cartLogout(state, action);
    default:
      return state;
  }
};

export default cartReducer;
