import React from "react";
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from "react-stripe-elements";
import { Card, Button, Typography, Alert, message, Spin } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as orderActions from "../store/actions/order";

class CheckoutForm extends React.Component {
  state = {
    loading: false,
    error: null,
    success: false,
  };

  submit = (ev) => {
    ev.preventDefault();
    this.setState({
      loading: true,
    });
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    // Calculate Total Cost on the backend
    axios
      .put(`/api/v1/cart-calculate-total/${this.props.userData.id}/`)
      .then((cartTotalResponse) => {
        // Lowers the stock of product based on quantities in the cart
        axios
          .patch(`/api/v1/cart-checkout/${this.props.userData.id}/`)
          .then((res) => {
            this.props.stripe.createToken().then((result) => {
              if (this.props.stripe) {
                if (result.error) {
                  this.setState({
                    error: result.error.message,
                    loading: false,
                  });
                } else {
                  axios.defaults.headers = {
                    "Content-Type": "application/json",
                    stripeToken: result.token.id,
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  };
                  axios
                    .post("/api/v1/orders/", {
                      user: this.props.userData.id,
                      shipping_address: this.props.selectedAddress,
                    })
                    .then((res) => {
                      this.props.orderCreateItems(
                        res.data.id,
                        this.props.cartData,
                        res.data.order_id
                      );
                      this.setState({
                        loading: false,
                        success: true,
                      });
                    })
                    .catch((err) => {
                      this.setState({
                        loading: false,
                        error: err,
                      });
                    });
                }
              } else {
                message.error("stripe is not loaded");
              }
            });
          })
          .catch((err) => {
            message.error("There is not enough stock for your order.");
          });
      });
  };

  render() {
    const { error, loading, success } = this.state;
    return (
      <div className="checkout">
        {success ? <Alert message="Payment Successful" type="success" /> : null}
        {error ? <Alert message="An error occured" type="error" /> : null}
        <Typography.Title
          level={4}
          style={{ color: "#114C00", marginTop: -10 }}
        >
          Enter Payment Information
        </Typography.Title>
        <CardElement />

        <Button
          onClick={this.submit}
          type="primary"
          style={{ marginTop: 20, fontWeight: "bold" }}
          disabled={loading}
          loading={loading}
        >
          Purchase
        </Button>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cartData,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    orderCreateItems: (orderID, cartData, order_id) =>
      dispatch(orderActions.orderCreateItems(orderID, cartData, order_id)),
  };
};

const InjectedForm = injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
);

class WrappedForm extends React.Component {
  render() {
    return (
      <Card style={{ borderColor: "#95cc43" }}>
        <StripeProvider apiKey="pk_test_bWLkXOm1BABgiAkXDPB5Xsf500uP7grZa4">
          <Elements>
            <InjectedForm
              userData={this.props.userData}
              selectedAddress={this.props.selectedAddress}
            />
          </Elements>
        </StripeProvider>
      </Card>
    );
  }
}

export default WrappedForm;
