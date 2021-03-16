import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  nav: null
};

export const navSet = (state, action) => {
  return updateObject(state, {
    nav: action.nav
  });
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NAV_SET:
      return navSet(state, action);
    default:
      return state;
  }
};

export default navReducer;
