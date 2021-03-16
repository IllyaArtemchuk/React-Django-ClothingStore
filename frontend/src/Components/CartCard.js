import React from "react";
import { Card, InputNumber, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

function CartCard(props) {
  const sizeConverter = () => {
    switch (props.item.size) {
      case "EXTRASMALL":
        return "XS";
      case "SMALL":
        return "S";
      case "MEDIUM":
        return "M";
      case "LARGE":
        return "L";
      case "EXTRALARGE":
        return "XL";
      default:
        return "";
    }
  };

  return (
    <Card bordered={false} style={{ minWidth: 350 }}>
      <Row>
        <Col span={8} style={{ marginRight: 40 }}>
          <div style={{ height: "50%", minWidth: 230 }}>
            <img
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              src={props.item.item.images[0].image}
              alt="product"
            ></img>
          </div>
        </Col>
        <Col span={2} />
        <Col span={props.size === "ultrasmall" ? 20 : 12}>
          <Row style={{ marginTop: 25 }}>
            <Link to={`/product/${props.item.item.id}`}>
              <Typography.Title
                level={4}
                style={{
                  verticalAlign: "middle"
                }}
              >
                {props.item.item.name}
              </Typography.Title>
            </Link>
          </Row>
          <Row>
            <Typography.Title level={4}>{sizeConverter()}</Typography.Title>
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
            <Col span={10}>
              <button
                onClick={() => props.deleteItem(props.item)}
                style={{
                  color: "#696969",
                  //backgroundColor: "none",
                  background: "none",
                  padding: 0,
                  fontSize: 14,
                  marginLeft: 10,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Remove{" "}
              </button>
            </Col>
          </Row>
          <Row style={{ color: "#95cc43", fontWeight: "bold" }}>
            Qty:{"   "}
            <InputNumber
              style={{
                marginTop: 15,
                marginRight: 9,
                width: 50
              }}
              value={props.quantities[props.item.id]}
              onChange={value => props.handleQuantityChange(value, props.item)}
              min={1}
            />
          </Row>
          <Row>
            <Typography
              style={{
                marginTop: 15,
                fontSize: 15,
                color: "#114C00"
              }}
            >
              {props.item.item.sale_price ? (
                <Typography>
                  Total: $
                  {props.item.item.sale_price * props.quantities[props.item.id]}
                </Typography>
              ) : (
                <Typography>
                  Total: $
                  {props.item.item.price * props.quantities[props.item.id]}
                </Typography>
              )}
            </Typography>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default CartCard;
