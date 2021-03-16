import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

function OrderCard(props) {
  return (
    <Card style={{ width: 350, marginTop: 20, borderColor: "#95cc43" }}>
      <Row>
        <Col span={8} style={{ marginRight: 40 }}>
          <div style={{ height: "50%", maxWidth: 500 }}>
            <img
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              alt="Product"
              src={`${props.item.item.images[0].image}`}
            ></img>
          </div>
        </Col>
        <Col span={2} />
        <Col span={12}>
          <Row>
            <Typography.Title
              level={4}
              style={{
                verticalAlign: "middle"
              }}
            >
              <Link
                to={`/product/${props.item.item.id}`}
                style={{ color: "#3A3A3A" }}
              >
                {props.item.item.name}
              </Link>
            </Typography.Title>
          </Row>
          <Row style={{ marginTop: -10 }}>
            <Typography style={{ fontWeight: "bold" }}>
              {props.item.quantity}
            </Typography>
            <Typography style={{ fontSize: 13 }}>{props.item.size}</Typography>
          </Row>
          <Row>
            <Col span={5}>
              {props.item.item.sale_price ? (
                <Typography style={{ fontWeight: "bold", color: "#114C00" }}>
                  ${props.item.item.sale_price}
                  <Typography
                    style={{
                      textDecoration: "line-through",
                      color: "grey",
                      fontWeight: "normal"
                    }}
                  >
                    ${props.item.item.price}
                  </Typography>
                </Typography>
              ) : (
                <Typography style={{ fontWeight: "bold", color: "#114C00" }}>
                  ${props.item.item.price}
                </Typography>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default OrderCard;
