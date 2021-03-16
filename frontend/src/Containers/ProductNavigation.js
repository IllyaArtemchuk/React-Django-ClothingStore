import React from "react";
import { Row, Col } from "antd";
import NavigationItem from "../Components/NavigationItem";

class ProductNavigation extends React.Component {
  render() {
    return (
      <Row style={{ marginTop: 9 }}>
        <Row>
          <Col span={5} style={{ minWidth: 80 }}>
            <NavigationItem genderQuery="men" />
          </Col>
          <Col span={4} style={{ minWidth: 80 }}>
            <NavigationItem genderQuery="women" />
          </Col>
        </Row>
      </Row>
    );
  }
}

export default ProductNavigation;
