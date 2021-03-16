import React from "react";
import { Alert, Col, Row } from "antd";

function CartAlert(props) {
  return (
    <Row style={{ marginTop: 10 }}>
      <Col span={18}>
        {props.changed ? (
          <Alert
            style={{ height: 40 }}
            type="success"
            message="Changes to cart detected, make sure to update cart."
          />
        ) : null}
      </Col>
    </Row>
  );
}

export default CartAlert;
