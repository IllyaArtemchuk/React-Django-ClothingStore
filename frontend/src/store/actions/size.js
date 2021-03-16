import * as actionTypes from "./actionTypes";

export const sizeSet = size => {
  return {
    type: actionTypes.SIZE_SET,
    size: size
  };
};

export const changeSize = size => {
  return dispatch => {
    dispatch(sizeSet(size));
  };
};
