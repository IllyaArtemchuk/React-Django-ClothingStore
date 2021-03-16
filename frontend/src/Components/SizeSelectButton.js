import React from "react";
import { Button, Tooltip } from "antd";

function SizeSelect(props) {
  const calculateColor = () => {
    if (props.selected === props.size) {
      return {
        marginRight: 10,
        marginTop: 10,
        backgroundColor: "#114C00",
        borderColor: "#114C00",
        width: 45
      };
    } else {
      return {
        marginRight: 10,
        marginTop: 10,
        width: 45
      };
    }
  };

  return (
    <Tooltip title={props.stock ? null : "Out of stock"}>
      <Button
        onClick={props.onSizeClick}
        type="primary"
        style={calculateColor()}
        disabled={!props.stock}
      >
        {props.size}
      </Button>
    </Tooltip>
  );
}

export default SizeSelect;
