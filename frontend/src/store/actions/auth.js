import * as actionTypes from "./actionTypes";
import * as cartActions from "./cart";
import axios from "axios";
import { message } from "antd";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationData");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
    error: null
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .post("/api/v1/rest-auth/login/", {
        email: email,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        message.success("You are logged in!");
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/api/v1/rest-auth/registration/", {
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        message.success("Successful Sign Up!");
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${res.data.key}`
        };
        let passedToken = res.data.key;
        axios.get("/api/v1/users/current/").then(res => {
          dispatch(cartActions.cartCreate(res.data.id, passedToken));
        });
      })
      .catch(err => {
        console.log(err.response.data.email);
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined || token === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        message.info("You have been logged out.");
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
