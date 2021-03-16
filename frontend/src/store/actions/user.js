import * as actionTypes from "./actionTypes";
import axios from "axios";

export const userStart = () => {
  return {
    type: actionTypes.USER_START,
  };
};

export const userSuccess = (userData) => {
  return {
    type: actionTypes.USER_SUCCESS,
    userData: userData,
  };
};

export const userFail = (error) => {
  return {
    type: actionTypes.USER_FAIL,
    error: error,
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
    userData: null,
  };
};

export const userGet = () => {
  return (dispatch) => {
    dispatch(userStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .get("/api/v1/users/current/")
      .then((res) => {
        dispatch(userSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userFail(err));
      });
  };
};

// Updates the default address for the user
export const addressUpdate = (id, updateNow = false) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    axios
      .patch(`/api/v1/users/default/update/`, {
        default_address: id,
      })
      .then((res) => {
        dispatch(userGet());
      })
      .catch((err) => {
        dispatch(userFail(err));
      });
  };
};

export const addressCreate = (
  country,
  street_address,
  zip,
  isdefault,
  apartment_number = ""
) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .post(`/api/v1/users/address/create/`, {
        country: country,
        street_address: street_address.toUpperCase(),
        zip: zip,
        apartment_number: apartment_number,
      })
      .then((res) => {
        if (isdefault) {
          dispatch(addressUpdate(res.data.id, true));
        }
      })
      .catch((err) => {
        dispatch(userFail(err));
      });
  };
};

export const addressRemove = (addressID) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    axios
      .patch(`/api/v1/users/address/update/${addressID}/`, {
        is_active: false,
      })
      .then((res) => dispatch(userGet()))
      .catch((err) => {
        dispatch(userFail(err));
      });
  };
};
