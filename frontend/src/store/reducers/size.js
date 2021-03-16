import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  size: "large"
};

const sizeSet = (state, action) => {
  return updateObject(state, {
    size: action.size
  });
};

const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIZE_SET:
      return sizeSet(state, action);
    default:
      return state;
  }
};

export default sizeReducer;
