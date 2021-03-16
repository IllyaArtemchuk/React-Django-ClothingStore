import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: false,
  loading: false,
  products: null,
  productDetail: null
};

const productStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const productSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    error: null,
    loading: false,
    productDetail: action.productDetail
  });
};

const productFail = (state, action) => {
  return updateObject(state, {
    products: null,
    productDetail: null,
    error: action.error,
    loading: false
  });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_START:
      return productStart(state, action);
    case actionTypes.PRODUCT_SUCCESS:
      return productSuccess(state, action);
    case actionTypes.PRODUCT_FAIL:
      return productFail(state, action);
    default:
      return state;
  }
};

export default productReducer;
