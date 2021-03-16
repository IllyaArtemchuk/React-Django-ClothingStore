import * as actionTypes from "./actionTypes";
import axios from "axios";
import history from "../../history";

export const orderStart = () => {
  return {
    type: actionTypes.ORDER_START,
  };
};

export const orderSuccess = (data) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    data: data,
  };
};

export const orderFail = (err) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error: err,
  };
};

export const orderLogout = () => {
  return {
    type: actionTypes.ORDER_LOGOUT,
  };
};

export const orderGet = () => {
  return (dispatch) => {
    dispatch(orderStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .get("/api/v1/orders/")
      .then((res) => dispatch(orderSuccess(res.data)))
      .catch((err) => dispatch(orderFail(err)));
  };
};

export const orderCreateItems = (orderID, cartData, order_id) => {
  return (dispatch) => {
    console.log(order_id);
    let orderItems = [];
    cartData.items.forEach((cartItem) => {
      orderItems.push({
        quantity: cartItem.quantity,
        item: cartItem.item.id,
        size: cartItem.size,
        order: orderID,
      });
    });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .post("/api/v1/orderitem/create/", orderItems)
      .then((res) => {
        axios.delete(`/api/v1/cart-checkout/${cartData.user}/`);
      })
      .then((res) => history.push(`/order/${order_id}`));
  };
};
