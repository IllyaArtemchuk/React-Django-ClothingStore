import * as actionTypes from "./actionTypes";

export const navSet = nav => {
  return {
    type: actionTypes.NAV_SET,
    nav: nav
  };
};

export const changeNav = nav => {
  return dispatch => {
    dispatch(navSet(nav));
  };
};
