import React from "react";
import { Row, Col, Button, Tag, Typography } from "antd";

function AddressListItem(props) {
  return (
    <Row
      style={{
        borderBottom: "solid",
        borderWidth: 1,
        marginBottom: 25,
        borderColor: "#E8E8E8"
      }}
    >
      <Row style={{ marginTop: -15 }}>
        <Col span={10}>{props.address.street_address}</Col>
        <Col span={8}></Col>
        <Col span={3}></Col>
      </Row>
      <Row style={{ float: "right", marginTop: -20 }}>
        <Button
          style={{ float: "right", color: "#6B6B6B" }}
          onClick={() => props.addressRemove(props.address.id)}
          size="small"
        >
          Remove
        </Button>
        {props.userData.default_address === props.address.id ? (
          <Tag color="green" style={{ height: 23 }}>
            Default Address
          </Tag>
        ) : (
          <Button
            size="small"
            style={{ marginRight: 10, color: "#6B6B6B" }}
            onClick={() => props.addressUpdate(props.address.id, true)}
          >
            Set Default
          </Button>
        )}
      </Row>
      <Row>
        <Col span={3}>{props.address.zip}</Col>
        <Col span={4}>
          {props.address.apartment_number !== "" ? (
            <Typography>Apt: {props.address.apartment_number}</Typography>
          ) : null}
        </Col>
      </Row>
      <Row>{props.address.country.code}</Row>
    </Row>
  );
}

export default AddressListItem;
