import React from "react";
import { Row, Col, Typography, Spin, Icon, Card } from "antd";
import { connect } from "react-redux";
import * as orderActions from "../store/actions/order";
import OrderCard from "../Components/OrderDetailCard";
import * as styles from "../styles/StyleObjects/GeneralStyle";
var moment = require("moment");
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class OrderDetail extends React.Component {
  state = {
    order: null,
  };
  componentDidMount() {
    this.props.getCartData(this.props.userData.id);
    if (this.props.orderData === null) {
      this.props.orderGet();
    }
    if (this.props.orderData !== null) {
      this.setState({
        order: this.props.orderData.filter(
          (orderDataItem) =>
            orderDataItem.order_id === this.props.match.params.orderID
        )[0],
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.orderData !== prevProps.orderData) {
      this.setState({
        order: this.props.orderData.filter(
          (orderDataItem) =>
            orderDataItem.order_id === this.props.match.params.orderID
        )[0],
      });
    }
  }

  render() {
    return (
      <Row>
        {!this.state.order ? (
          <Spin indicator={antIcon} />
        ) : (
          <Row>
            {this.props.size === "ultrasmall" ? (
              <Col span={1} />
            ) : (
              <Col span={8} style={{ minWidth: 20 }} />
            )}
            <Col span={8}>
              <Row style={{ minWidth: 250, textAlign: "center" }}>
                <Col span={this.props.size === "ultrasmall" ? 0 : 2} />
                <Col span={this.props.size === "ultrasmall" ? 20 : 15}>
                  <Typography.Title
                    level={1}
                    style={{ color: "#114C00", minWidth: 300 }}
                  >
                    {" "}
                    Order Details
                  </Typography.Title>
                </Col>
                <Col span={this.props.size === "ultrasmall" ? 2 : 7} />
              </Row>

              <Row>
                <Col span={10} style={{ minWidth: 360, marginTop: 20 }}>
                  <Card
                    style={{
                      borderColor: "#95cc43",
                      width: 350,
                      height: 200,
                    }}
                  >
                    <Row>
                      <p style={styles.orderDetailTitle}>Shipping Address</p>
                      <p style={{ marginTop: -10 }}>
                        <b>Address:</b>{" "}
                        {this.state.order.shipping_address.street_address}
                      </p>
                      {this.state.order.shipping_address.apartment_number ===
                      "" ? null : (
                        <p style={{ marginTop: -18 }}>
                          <b>Apt:</b>{" "}
                          {this.state.order.shipping_address.apartment_number}
                        </p>
                      )}
                      <p style={{ marginTop: -18 }}>
                        <b>Zip:</b> {this.state.order.shipping_address.zip}
                      </p>
                      <p style={{ marginTop: -18 }}>
                        <b>Country:</b>{" "}
                        {this.state.order.shipping_address.country.code}
                      </p>
                      <p style={{ marginTop: -18 }}>
                        <b>Tracking#:</b> Unavailable
                      </p>
                    </Row>
                  </Card>
                </Col>

                <Col span={10} style={{ minWidth: 360, marginTop: 20 }}>
                  <Card
                    style={{
                      width: 350,
                      height: 200,
                      borderColor: "#95cc43",
                    }}
                  >
                    <Row>
                      <p style={styles.orderDetailTitle}>Order Summary</p>
                      <p style={{ marginTop: -10 }}>
                        <b>Order ID:</b> {this.state.order.order_id}
                      </p>
                      <p style={{ marginTop: -18 }}></p>
                      <p style={{ marginTop: -18 }}>
                        <b>Ordered On:</b>{" "}
                        {moment(this.state.order.created_at).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </p>
                      <p style={{ marginTop: -18 }}>
                        <b>Total:</b> ${this.state.order.total}
                      </p>
                    </Row>
                  </Card>
                </Col>
                <Col span={3} />
              </Row>
              <Row style={{ marginTop: 20, textAlign: "center" }}>
                <Col span={this.props.size === "ultrasmall" ? 0 : 2} />
                <Col span={this.props.size === "ultrasmall" ? 20 : 15}>
                  <Typography.Title
                    level={2}
                    style={{ color: "#114C00", minWidth: 300 }}
                  >
                    Products Purchased
                  </Typography.Title>
                </Col>
                <Col span={this.props.size === "ultrasmall" ? 2 : 7} />
              </Row>
              <Row>
                <Col span={8}>
                  {this.state.order.items.map((item) => (
                    <OrderCard item={item} key={item.id} />
                  ))}
                </Col>
              </Row>
            </Col>
            <Col span={7} />
          </Row>
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderData: state.order.data,
    size: state.size.size,
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderGet: () => dispatch(orderActions.orderGet()),
    getCartData: (userID) => dispatch(cartActions.cartGet(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
