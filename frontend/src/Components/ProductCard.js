import React from "react";
import { Card, Row, Col, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import * as styles from "../styles/StyleObjects/GeneralStyle";
import "../styles/cardStyles.css";
const { Meta } = Card;

function ProductCard(props) {
  const determineDescription = item => {
    if (item.description.length > 25) {
      return (
        <Typography style={{ color: "#114C00", textAlign: "center" }}>
          {item.description.substr(0, 25) + "..."}
        </Typography>
      );
    } else
      return (
        <Typography style={{ color: "#114C00", textAlign: "center" }}>
          {item.description}
        </Typography>
      );
  };

  const determineIcon = item => {
    var tag = <div></div>;
    switch (item.tag) {
      case "SALE":
        tag = <Tag color="green">Sale</Tag>;
        break;
      case "HOT":
        tag = <Tag color="red">Hot</Tag>;
        break;
      case "LOW":
        tag = <Tag color="orange">Low</Tag>;
        break;
      case "OUT":
        tag = <Tag color="#6B6B6B">Out</Tag>;
        break;
      case "NEW":
        tag = <Tag color="gold">New</Tag>;
        break;
      default:
        tag = <div></div>;
    }

    return (
      <div style={{ color: "black", marginTop: -2 }}>
        <Row style={{ marginLeft: 0 }}>
          <Col style={{ textAlign: "center" }}>
            {tag}
            {item.name}{" "}
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Link to={`/product/${props.item.id}`}>
      <Card
        hoverable
        cover={
          <img
            src={props.item.images[0].image}
            alt="Product"
            style={{
              alignContent: "center",
              minHeight: 250,
              objectFit: "cover",
              width: "100%"
            }}
          />
        }
        bordered={false}
        style={{ minWidth: 180, minHeight: 300, textAlign: "center" }}
      >
        <Meta
          title={determineIcon(props.item)}
          description={determineDescription(props.item)}
        />
        {props.item.sale_price ? (
          <Row style={{ marginTop: 15, marginBottom: -15 }}>
            <Typography style={styles.NewPrice}>
              ${props.item.sale_price}
            </Typography>
          </Row>
        ) : (
          <Row style={{ marginTop: 15, marginBottom: -15 }}>
            <Typography style={styles.Price}>${props.item.price}</Typography>
          </Row>
        )}
      </Card>
    </Link>
  );
}

export default ProductCard;
