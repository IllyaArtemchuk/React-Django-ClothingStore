import React from "react";
import { Button, Typography } from "antd";

function AddToCartButton(props) {
  const isDisabled = () => {
    if (props.selectedSize == null) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Button
      onClick={() => props.handleSubmit()}
      type="primary"
      style={{
        width: "100%",
        color: "#f5f2f2",
        height: 60,
        fontSize: 30,
        fontWeight: "bold",
      }}
      disabled={isDisabled()}
    >
      {isDisabled() ? (
        <Typography style={{ color: "#BABABA" }}>Add To Cart</Typography>
      ) : (
        "Add To Cart"
      )}
    </Button>
  );
}

export default AddToCartButton;
