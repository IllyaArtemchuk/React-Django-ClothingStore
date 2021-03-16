import React from "react";
import { Row, Menu } from "antd";
import DropDownItem from "./NavDropDownItem";

function NavDropDown(props) {
  return (
    <Row
      style={{
        marginTop: 10,
        marginLeft: -5
      }}
    >
      <Menu style={{ backgroundColor: "white", height: 140 }}>
        <Menu.Item key="1">
          <DropDownItem
            typeDisplayName="Shirts"
            typeName="shirt"
            genderName={props.genderQuery}
          />
        </Menu.Item>
        <Menu.Item key="2">
          <DropDownItem
            typeDisplayName="Pants"
            typeName="pants"
            genderName={props.genderQuery}
          />
        </Menu.Item>
        <Menu.Item key="3">
          <DropDownItem
            typeDisplayName="Outerwear"
            typeName="outerwear"
            genderName={props.genderQuery}
          />
        </Menu.Item>
      </Menu>
    </Row>
  );
}

export default NavDropDown;
