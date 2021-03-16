import React from "react";
import { Button, Card, Alert } from "antd";

function NoAddresses(props) {
  return (
    <Card
      title="Shipping Address"
      headStyle={{
        color: "#114C00",
        fontSize: 17
      }}
    >
      <Alert type="success" message="No Addresses Found" />
      <Button
        onClick={props.toggleNewAddress}
        type="primary"
        style={{
          marginLeft: 20,
          marginTop: 10
        }}
      >
        Add One
      </Button>
    </Card>
  );
}

export default NoAddresses;
