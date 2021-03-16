import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";

function DropDownItem(props) {
  return (
    <Link to={`/products/?for=${props.genderName}&type=${props.typeName}`}>
      <Typography.Title level={4} style={{ color: "#114C00" }}>
        {props.typeDisplayName}
      </Typography.Title>
    </Link>
  );
}

export default DropDownItem;
