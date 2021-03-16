import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Spin,
  Icon,
  Button,
  Card,
  message,
  Alert
} from "antd";
import OrderList from "../Components/OrderList";
import AddressCreate from "./AddressCreate";
import AddressListItem from "../Components/AddressListItem";
import * as userActions from "../store/actions/user";
import * as orderActions from "../store/actions/order";
import * as navActions from "../store/actions/navBar";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Profile extends React.Component {
  state = {
    newAddressShowing: false
  };
  componentDidMount() {
    this.props.orderGet();
    if (this.props.nav !== "1") {
      this.props.changeNav("1");
    }
  }

  refreshPage = () => {
    window.location.reload();
  };

  cardSize = () => {
    return this.props.size === "ultrasmall" || this.props.size === "small"
      ? { minWidth: 350 }
      : { minWidth: 530 };
  };

  updateDefault = addressID => {
    this.props.addressUpdate(addressID);
    this.props.userDetailGet();
  };

  toggleNewAddress = () => {
    if (!this.state.newAddressShowing) {
      if (this.props.userData.addresses.length > 2) {
        return message.error(
          "Address Limit Reached. Remove one to make space."
        );
      }
      this.setState({
        newAddressShowing: true
      });
    } else {
      this.setState({
        newAddressShowing: false
      });
    }
  };

  render() {
    return (
      <Row>
        {this.props.size === "ultrasmall" ? null : <Col span={7} />}

        <Col span={10}>
          {this.props.userData ? (
            <Row>
              <Row
                style={{ marginBottom: 20, minWidth: 270, textAlign: "center" }}
              >
                <Typography.Title level={2}>Your Account</Typography.Title>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={4} />
                <Col span={16} style={this.cardSize()}>
                  <Card
                    style={{ borderColor: "#114C00" }}
                    title={
                      <Typography.Title
                        level={3}
                        style={{
                          marginBottom: -10,
                          marginTop: -10,
                          color: "#114C00"
                        }}
                      >
                        Account Information
                      </Typography.Title>
                    }
                  >
                    <Row style={{ marginTop: -10 }}>
                      <Col span={12} style={{ minWidth: 180 }}>
                        <Typography>
                          <b style={{ color: "#114C00" }}>Email:</b>{" "}
                          {this.props.userData.email}
                        </Typography>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={4} />
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={4} />
                <Col span={16} style={this.cardSize()}>
                  <Card
                    style={{ borderColor: "#95cc43" }}
                    title={
                      <Typography.Title
                        level={3}
                        style={{
                          marginBottom: -10,
                          marginTop: -10,
                          color: "#114C00"
                        }}
                      >
                        Orders
                      </Typography.Title>
                    }
                  >
                    {this.props.orders ? (
                      <Row style={{ marginTop: -20 }}>
                        {this.props.orders.length ? (
                          <OrderList orders={this.props.orders} />
                        ) : (
                          <Alert
                            message="You have not placed any orders yet"
                            type="success"
                            style={{ marginTop: 10 }}
                          />
                        )}
                      </Row>
                    ) : (
                      <Spin indicator={antIcon} />
                    )}
                  </Card>
                </Col>
                <Col span={4} />
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={4} />
                <Col span={16} style={this.cardSize()}>
                  <Card
                    style={{ borderColor: "#114C00" }}
                    title={
                      <Row>
                        <Typography.Title
                          level={3}
                          style={{
                            marginBottom: -10,
                            marginTop: -10,
                            color: "#114C00"
                          }}
                        >
                          Addresses
                        </Typography.Title>
                        <Row style={{ float: "right", marginTop: -15 }}>
                          <Button
                            style={{ height: 25, fontWeight: "bold" }}
                            type="primary"
                            onClick={this.toggleNewAddress}
                          >
                            Add New Address
                          </Button>
                        </Row>
                      </Row>
                    }
                  >
                    {this.props.userData.addresses.length ? (
                      <Row>
                        {this.props.userData.addresses.map(address => (
                          <AddressListItem
                            key={address.id}
                            address={address}
                            addressRemove={this.props.addressRemove}
                            userData={this.props.userData}
                            addressUpdate={this.props.addressUpdate}
                          />
                        ))}
                      </Row>
                    ) : (
                      <Alert
                        message="You do not have any addresses"
                        type="success"
                        style={{ marginTop: 10 }}
                      />
                    )}
                    {this.state.newAddressShowing ? (
                      <AddressCreate toggleShowing={this.toggleNewAddress} />
                    ) : null}
                  </Card>
                </Col>
                <Col span={4} />
              </Row>
            </Row>
          ) : (
            <Row justify="center">
              <Col span={11} />
              <Col span={2}>
                <Spin indicator={antIcon} size="large" />
              </Col>
              <Col span={11} />
            </Row>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    orders: state.order.data,
    size: state.size.size,
    nav: state.nav.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userDetailGet: () => dispatch(userActions.userGet()),
    orderGet: () => dispatch(orderActions.orderGet()),
    addressRemove: addressID => dispatch(userActions.addressRemove(addressID)),
    addressUpdate: (addressID, updateNow) =>
      dispatch(userActions.addressUpdate(addressID, updateNow)),
    changeNav: nav => dispatch(navActions.changeNav(nav))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
