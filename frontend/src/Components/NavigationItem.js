import React from "react";
import { Dropdown, Typography } from "antd";
import { Link } from "react-router-dom";
import NavDropDown from "./NavDropDown.js";

function NavItem(props) {
  return (
    <Dropdown overlay={<NavDropDown genderQuery={props.genderQuery} />}>
      <Link to={`/products/?for=${props.genderQuery}`}>
        <Typography.Title level={2} style={{ color: "white" }}>
          {props.genderQuery.charAt(0).toUpperCase() +
            props.genderQuery.slice(1)}
        </Typography.Title>
      </Link>
    </Dropdown>
  );
}

export default NavItem;
