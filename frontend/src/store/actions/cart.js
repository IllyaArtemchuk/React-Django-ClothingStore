import * as actionTypes from "./actionTypes";
import { message } from "antd";
import axios from "axios";

export const cartStart = () => {
  return {
    type: actionTypes.CART_START
  };
};

export const cartSuccess = cartData => {
  return {
    type: actionTypes.CART_SUCCESS,
    cartData: cartData
  };
};

export const cartFail = error => {
  return {
    type: actionTypes.CART_FAIL,
    error: error
  };
};

export const cartLogout = () => {
  return {
    type: actionTypes.CART_LOGOUT
  };
};

export const cartGet = userID => {
  return dispatch => {
    dispatch(cartStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    };

    axios
      .get(`/api/v1/cart/${userID}/`)
      .then(res => {
        res.data.items.sort((a, b) => (a.id < b.id ? 1 : -1));
        dispatch(cartSuccess(res.data));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const cartCreate = (userID, token = null) => {
  return dispatch => {
    dispatch(cartStart());
    if (token !== null) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      };
    } else {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
    }
    axios
      .post(`/api/v1/newcart/`, {
        user: userID
      })
      .then(res => {
        window.location.reload(false);
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const cartAddCartItem = (productID, quantity, userID, size) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    };

    axios
      .post(`/api/v1/cartitem/create/`, {
        item: productID,
        cart: userID,
        quantity: quantity,
        size: size
      })
      .then(res => {
        message.success("Added To Cart!");
        dispatch(cartGet(userID));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const cartUpdate = (cartData, quantities) => {
  return dispatch => {
    for (const property in quantities) {
      let item = cartData.items.find(
        cartItem =>
          cartItem.id === property && cartItem.quantity !== quantities[property]
      );
      if (item) {
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        };

        axios
          .put(`/api/v1/cartitem/${item.id}/`, {
            quantity: quantities[property],
            cart: cartData.user,
            size: item.size
          })
          .then(res => dispatch(cartGet(cartData.user)))
          .catch(err => {
            dispatch(cartFail(err));
          });
      }
    }
  };
};

// Add Quantity to an item that is already in the cart.
export const cartUpdateProductDetail = (item, additionalQuantity, cartData) => {
  return dispatch => {
    dispatch(cartStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    };

    axios
      .get(`/api/v1/cartitem/${item.id}/`)
      .then(res => {
        axios
          .put(`/api/v1/cartitem/${item.id}/`, {
            quantity: res.data.quantity + additionalQuantity,
            cart: cartData.user,
            size: item.size
          })
          .then(res => {
            message.success("Added To Cart!");
            axios
              .get(`/api/v1/cart/${cartData.user}/`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("token")}`
                }
              })
              .then(res => {
                res.data.items.sort((a, b) => (a.id < b.id ? 1 : -1));
                dispatch(cartSuccess(res.data));
              });
          });
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const cartRemoveItem = (item, userID) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    };

    axios
      .delete(`/api/v1/cartitem/${item.id}/`)
      .then(res => {
        dispatch(cartGet(userID));
      })
      .catch(err => dispatch(cartFail(err)));
  };
};
