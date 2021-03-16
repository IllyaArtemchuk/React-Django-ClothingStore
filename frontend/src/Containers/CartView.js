import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Button,
  Empty,
  Icon,
  Spin,
  message,
  Card,
  Affix,
  Radio
} from "antd";
import * as styles from "../styles/StyleObjects/GeneralStyle";
import * as cartActions from "../store/actions/cart";
import * as productActions from "../store/actions/product";
import * as userActions from "../store/actions/user";
import * as navActions from "../store/actions/navBar";
import CartCard from "../Components/CartCard";
import CartAlert from "../Components/CartAlert";
import NoAddresses from "../Components/NoAddresses";
import AddressCreate from "./AddressCreate";
import Checkout from "./CheckoutForm";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Cart extends React.Component {
  state = {
    quantities: {},
    changed: false,
    selectedAddress: 0,
    newAddressShowing: false,
    checkoutShowing: false,
    total: 0
  };
  componentDidMount() {
    if (this.props.userData) {
      this.props.getCartData(this.props.userData.id);
      this.setDefaultAddress();
      this.setTotalState();
    }
    if (
      this.props.cartData !== null &&
      !Object.keys(this.state.quantities).length
    ) {
      this.getQuantities();
    }
    if (!this.props.products) {
      this.props.productGet();
    }
    if (this.props.nav !== "2") {
      this.props.changeNav("2");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartData !== prevProps.cartData) {
      this.getQuantities();
      this.setTotalState();
    }
    if (
      this.props.userData !== prevProps.userData &&
      prevProps.userData === null
    ) {
      this.props.getCartData(this.props.userData.id);
      this.setDefaultAddress();
    }
  }

  setDefaultAddress = () => {
    for (let i = 0; i < this.props.userData.addresses.length; i++) {
      if (
        this.props.userData.addresses[i].id ===
        this.props.userData.default_address
      ) {
        this.setState({
          selectedAddress: this.props.userData.default_address
        });
        return;
      }
    }
  };

  // Create a dictionary of quantities to compare to
  //  database values for updating the cart
  getQuantities = () => {
    let newQuantities = {};
    this.props.cartData.items.forEach(item => {
      newQuantities[item.id] = item.quantity;
    });
    this.setState({
      quantities: newQuantities
    });
  };

  // Updates the quantity dict state and checks to make sure
  //  there is enough stock for the purchase
  handleQuantityChange = (value, item) => {
    let productByID;

    productByID = this.props.products.find(
      product => product.id === item.item.id
    );
    if (
      productByID.stock.find(stock => stock.size === item.size).stock < value
    ) {
      return message.error("There is not enough of this product in stock");
    }
    this.setState(state => {
      state.quantities[item.id] = value;
      return state;
    });
    if (this.state.changed === false) {
      this.setState({
        changed: true
      });
    }
  };

  updateCart = (cartData, quantities) => {
    this.props.cartUpdate(cartData, quantities);
    message.success("Cart Updated");
    this.setState({ changed: false });
  };

  deleteItem = item => {
    this.props.cartRemoveItem(item, this.props.userData.id);
    this.setState({
      checkoutShowing: false
    });
  };

  onAddressChange = e => {
    this.setState({
      selectedAddress: e.target.value
    });
  };

  toggleCheckoutShowing = () => {
    if (this.state.checkoutShowing) {
      this.setState({
        checkoutShowing: false
      });
    } else {
      if (this.props.cartData.items.length === 0) {
        return message.error("You have no items in your cart!");
      }
      if (this.state.selectedAddress === 0) {
        return message.error("Select an Address");
      }
      this.setState({
        checkoutShowing: true
      });
    }
  };

  // Toggles whether new address form is showing or not
  toggleNewAddress = () => {
    if (this.props.userData.addresses.length > 2) {
      return message.error(
        "You have reached your Address limit, delete some on your Profile",
        6
      );
    } else {
      this.state.newAddressShowing
        ? this.setState({
            newAddressShowing: false
          })
        : this.setState({
            newAddressShowing: true
          });
    }
  };

  // Calculates the total for display purposes
  calculateTotal = () => {
    let total = 0;
    this.props.cartData.items.forEach(cartItem => {
      if (cartItem.item.sale_price !== null && cartItem.item.sale_price !== 0) {
        total = total + cartItem.item.sale_price * cartItem.quantity;
      } else {
        total = total + cartItem.item.price * cartItem.quantity;
      }
    });
    return total;
  };

  setTotalState = () => {
    let total = this.calculateTotal();
    this.setState({
      total: total
    });
  };

  render() {
    return (
      <div>
        {!this.props.cartData ? (
          <Spin indicator={antIcon} />
        ) : (
          <Row type="flex">
            <Col span={5}></Col>
            <Col
              span={7}
              style={
                this.props.size === "ultrasmall"
                  ? { minWidth: 350 }
                  : { minWidth: 600 }
              }
            >
              <Row style={{ minHeight: 200 }}>
                <Row>
                  <Col
                    span={16}
                    style={
                      this.props.size === "ultrasmall"
                        ? {
                            borderBottom: "solid",
                            borderWidth: 2,
                            minWidth: 350,
                            color: "#114C00"
                          }
                        : {
                            borderBottom: "solid",
                            borderWidth: 2,
                            minWidth: 550,
                            color: "#114C00"
                          }
                    }
                  >
                    <Col span={12}>
                      <Typography.Title style={styles.CartTitle}>
                        Items
                      </Typography.Title>
                    </Col>
                    <Col span={10} offset={2} style={{ minWidth: 130 }}>
                      <Button
                        onClick={() =>
                          this.updateCart(
                            this.props.cartData,
                            this.state.quantities
                          )
                        }
                        type="primary"
                        style={styles.UpdateCartButton}
                      >
                        Update Cart
                      </Button>
                    </Col>
                  </Col>
                </Row>
                <CartAlert changed={this.state.changed} />
                {this.props.cartData.items.length > 0 ? (
                  <Row>
                    {this.props.cartData.items.map(item => (
                      <CartCard
                        item={item}
                        key={item.id}
                        size={this.props.size}
                        deleteItem={this.deleteItem}
                        quantities={this.state.quantities}
                        handleQuantityChange={this.handleQuantityChange}
                      />
                    ))}
                  </Row>
                ) : (
                  <Row>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={false}
                    >
                      Your Cart Is Empty
                    </Empty>
                  </Row>
                )}
                <CartAlert changed={this.state.changed} />
              </Row>
            </Col>
            <Col span={5}>
              <Affix style={{ minWidth: 350 }}>
                <Row style={styles.checkoutBorder}>
                  <Typography.Title style={styles.TitleDark}>
                    Checkout
                  </Typography.Title>
                </Row>
                <Row style={{ marginTop: 30 }}>
                  <Col style={{ minWidth: 300 }}>
                    {this.props.userData.addresses.length === 0 ? (
                      <NoAddresses toggleNewAddress={this.toggleNewAddress} />
                    ) : (
                      <Card
                        style={{ borderColor: "#95cc43" }}
                        headStyle={{
                          color: "#114C00",
                          fontSize: 17,
                          marginBottom: -10
                        }}
                        title="Shipping Address"
                      >
                        <Radio.Group
                          value={this.state.selectedAddress}
                          onChange={this.onAddressChange}
                        >
                          {this.props.userData.addresses.map(
                            (address, index) => (
                              <Radio key={index} value={address.id}>
                                {address.street_address}, {address.zip}...
                              </Radio>
                            )
                          )}
                        </Radio.Group>
                        <Button
                          size="small"
                          onClick={this.toggleNewAddress}
                          style={{ marginLeft: 20, marginTop: 10 }}
                        >
                          Add Another
                        </Button>
                      </Card>
                    )}
                    {this.state.newAddressShowing ? (
                      <AddressCreate toggleShowing={this.toggleNewAddress} />
                    ) : null}
                    <Row style={{ marginTop: 20 }}>
                      <Card
                        title={
                          <Typography.Title level={3}>
                            Total: ${this.state.total}{" "}
                          </Typography.Title>
                        }
                        bordered={false}
                      >
                        {this.state.checkoutShowing ? (
                          <Checkout
                            selectedAddress={this.state.selectedAddress}
                            userData={this.props.userData}
                          />
                        ) : (
                          <Button
                            type="primary"
                            size="large"
                            style={{
                              width: "100%",
                              height: 50,
                              fontWeight: "bold",
                              fontSize: 20
                            }}
                            onClick={this.toggleCheckoutShowing}
                          >
                            Checkout With Stripe
                          </Button>
                        )}
                      </Card>
                    </Row>
                  </Col>
                  <Col span={3} />
                </Row>
              </Affix>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    cartLoading: state.cart.cartLoading,
    cartError: state.cart.cartError,
    userData: state.user.userData,
    products: state.product.products,
    size: state.size.size,
    nav: state.nav.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCartData: userID => dispatch(cartActions.cartGet(userID)),
    cartUpdate: (cartData, quantities) =>
      dispatch(cartActions.cartUpdate(cartData, quantities)),
    cartRemoveItem: (item, userID) =>
      dispatch(cartActions.cartRemoveItem(item, userID)),
    productGet: () => dispatch(productActions.productGet()),
    userGet: () => dispatch(userActions.userGet()),
    changeNav: nav => dispatch(navActions.changeNav(nav))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
