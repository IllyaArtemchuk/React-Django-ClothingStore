import React from "react";
import { Row, Col, Typography } from "antd";
import * as styles from "../styles/StyleObjects/GeneralStyle";

function PriceDisplay(props) {
  return (
    <div>
      {props.productDetail.sale_price ? (
        <Row type="flex" align="middle">
          <Col span={3} style={{ marginRight: 80, minWidth: 70 }}>
            <Typography.Title style={styles.NewPriceLarge}>
              ${props.productDetail.sale_price}
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title style={styles.OldPriceLarge}>
              ${props.productDetail.price}
            </Typography.Title>
          </Col>
        </Row>
      ) : (
        <Typography.Title style={{ color: "#114C00" }}>
          ${props.productDetail.price}
        </Typography.Title>
      )}
    </div>
  );
}

export default PriceDisplay;
