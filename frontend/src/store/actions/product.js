import * as actionTypes from "./actionTypes";
import axios from "axios";

export const productStart = () => {
  return {
    type: actionTypes.PRODUCT_START
  };
};

export const productSuccess = (products, productDetail = null) => {
  return {
    type: actionTypes.PRODUCT_SUCCESS,
    products: products,
    productDetail: productDetail
  };
};

export const productFail = error => {
  return {
    type: actionTypes.PRODUCT_FAIL,
    error: error
  };
};

export const productGet = () => {
  return dispatch => {
    dispatch(productStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .get("/api/v1/products/")
      .then(res => dispatch(productSuccess(res.data)))
      .catch(err => {
        dispatch(productFail(err));
      });
  };
};

export const productDetailGet = (productID, products) => {
  return dispatch => {
    dispatch(productStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .get(`/api/v1/products/${productID}/`)
      .then(res => dispatch(productSuccess(products, res.data)))
      .catch(err => {
        dispatch(productFail(err));
      });
  };
};
