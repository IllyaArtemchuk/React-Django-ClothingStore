import React from "react";
import {
  Row,
  Col,
  Icon,
  Spin,
  Typography,
  Card,
  InputNumber,
  Tag,
  message
} from "antd";
import * as styles from "../styles/StyleObjects/GeneralStyle";
import { connect } from "react-redux";
import * as productActions from "../store/actions/product";
import * as cartActions from "../store/actions/cart";
import * as navActions from "../store/actions/navBar";
import SizeSelect from "../Components/SizeSelectButton";
import LoginRequired from "../Components/LoginRequiredPopOver";
import AddToCartButton from "../Components/AddToCartButton";
import PriceDisplay from "../Components/PriceDisplay";
import ImageGallery from "react-image-gallery";
import CartQuantity from "../Components/CurrentCartQuantity";
import "../styles/imagegallery.css";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
let sizeList = [];

class ProductDetail extends React.Component {
  state = {
    images: [],
    selectedSize: null,
    quantity: 1,
    loginRequiredVisible: false
  };

  componentDidMount() {
    const productID = this.props.match.params.productID;
    this.props.productDetailGet(productID, this.props.products);
    if (this.props.productDetail) {
      this.findInStock();
    }
    if (this.props.nav !== "null") {
      this.props.changeNav(null);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productDetail !== this.props.productDetail) {
      let imageState = [];
      this.props.productDetail.images.forEach(image =>
        imageState.push({ original: image.image, thumbnail: image.image })
      );
      this.setState({
        images: imageState
      });
      this.findInStock();
    }
    if (this.props.userData !== prevProps.userData) {
      if (!this.props.cartData) {
        this.props.cartGet(this.props.userData.id);
      }
    }
  }

  setSelectedSize = (size, e) => {
    if (size !== this.state.selectedSize) {
      this.setState({
        selectedSize: size,
        quantity: 1
      });
    }
  };

  showGender = () => {
    var returned = "";
    switch (this.props.productDetail.gender) {
      case "MALE":
        returned = "M";
        break;
      case "FEMALE":
        returned = "F";
        break;
      case "UNISEX":
        returned = "Unisex";
        break;
      default:
        returned = "";
        break;
    }

    return returned;
  };

  findInStock = () => {
    sizeList = [
      { size: "XS", stock: false, dataBaseName: "EXTRASMALL" },
      { size: "S", stock: false, dataBaseName: "SMALL" },
      { size: "M", stock: false, dataBaseName: "MEDIUM" },
      { size: "L", stock: false, dataBaseName: "LARGE" },
      { size: "XL", stock: false, dataBaseName: "EXTRALARGE" }
    ];

    sizeList.forEach(size => {
      this.props.productDetail.stock.forEach(stockItem => {
        if (stockItem.size === size.dataBaseName && stockItem.stock > 0) {
          size.stock = true;
        }
      });
    });
  };

  // changes the shorthand size to the values used in the backend/database
  convertToDBSize = size => {
    let dbSize = "";
    switch (size) {
      case "S":
        dbSize = "SMALL";
        break;
      case "M":
        dbSize = "MEDIUM";
        break;
      case "L":
        dbSize = "LARGE";
        break;
      case "XL":
        dbSize = "EXTRALARGE";
        break;
      case "XS":
        dbSize = "EXTRASMALL";
        break;
      default:
        dbSize = "";
    }
    return dbSize;
  };

  // Checks to see if you selected a size and checks if the
  //  selected size has enough stock for the order
  onQuantityChange = value => {
    let dbSize = this.convertToDBSize(this.state.selectedSize);
    if (dbSize === "") return message.error("Select A Size!");

    let sizeDBObject = this.props.productDetail.stock.find(
      obj => obj.size === dbSize
    );
    if (sizeDBObject.stock < value) {
      return message.error("We do not have enough of this product in stock.");
    } else {
      this.setState({
        quantity: value
      });
    }
  };

  findInCart = () => {
    let currentID = this.props.productDetail.id;
    let currentSize = this.convertToDBSize(this.state.selectedSize);
    let foundItem = this.props.cartData.items.find(
      cartItem =>
        cartItem.item.id === currentID && cartItem.size === currentSize
    );
    if (foundItem) {
      return foundItem;
    } else return false;
  };

  checkAdditiveStock = cartItem => {
    let currentStock = this.props.productDetail.stock.find(
      stockItem => stockItem.size === cartItem.size
    );
    if (currentStock.stock < cartItem.quantity + this.state.quantity) {
      return cartItem.quantity + this.state.quantity - currentStock.stock;
    } else {
      return true;
    }
  };

  showLoginRequired = () => {
    this.setState({
      loginRequiredVisible: true
    });
  };

  handleAddToCart = (productID, quantity, userID, size) => {
    let foundItem = this.findInCart();
    if (foundItem) {
      let enoughStock = this.checkAdditiveStock(foundItem);
      if (enoughStock === true) {
        this.props.cartUpdateProductDetail(
          foundItem,
          this.state.quantity,
          this.props.cartData
        );
      } else {
        return message.error(
          `You are over our current stock by ${enoughStock}!`
        );
      }
    } else {
      this.props.cartAddCartItem(productID, quantity, userID, size);
    }
  };

  executeClickOut = () => {
    if (this.state.loginRequiredVisible === true) {
      this.setState({
        loginRequiredVisible: false
      });
    }
  };

  render() {
    return (
      <div>
        {!this.props.productDetail ? (
          <Spin indicator={antIcon} />
        ) : (
          <Row>
            <Col span={5}></Col>
            <Col span={8} style={{ minWidth: 360 }}>
              <ImageGallery
                showPlayButton={false}
                showNav={false}
                thumbnailClass={styles.imageThumbnail}
                showFullscreenButton={false}
                thumbnailPosition={"left"}
                items={this.state.images}
              />
            </Col>
            <Col span={8} style={{ minWidth: 360 }}>
              <Row>
                <Col span={2}></Col>
                <Col span={19}>
                  <Typography.Title>
                    {this.props.productDetail.name}
                  </Typography.Title>
                </Col>
              </Row>
              <Row>
                <Col span={2}></Col>
                <Col span={18}>
                  <PriceDisplay productDetail={this.props.productDetail} />
                </Col>
              </Row>
              <Row>
                <Col span={2} />
                <Col span={20}>
                  <Card title="Description" bordered={false}>
                    <p>{this.props.productDetail.description}</p>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={2} />
                <Col span={20}>
                  <Card
                    title={
                      <div>
                        Size
                        <Tag style={{ marginLeft: 5, fontSize: 14 }}>
                          {this.showGender()}
                        </Tag>
                      </div>
                    }
                    bordered={false}
                  >
                    <Row style={{ overflow: "hidden" }}>
                      {sizeList.map((size, index) => (
                        <SizeSelect
                          size={size.size}
                          key={index}
                          onSizeClick={() => this.setSelectedSize(size.size)}
                          stock={size.stock}
                          selected={this.state.selectedSize}
                        />
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={2} />
                <Col span={20}>
                  <Card
                    title={
                      <div>
                        Quantity:{"  "}
                        <InputNumber
                          style={{ marginTop: 15, width: 50, marginLeft: 10 }}
                          value={this.state.quantity}
                          min={1}
                          onChange={this.onQuantityChange}
                        />
                        {this.props.cartData && this.state.selectedSize ? (
                          <CartQuantity
                            cartData={this.props.cartData}
                            productDetail={this.props.productDetail}
                            selectedSize={this.state.selectedSize}
                            convertToDBSize={this.convertToDBSize}
                          />
                        ) : null}
                      </div>
                    }
                    bordered={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <LoginRequired
                    visible={this.state.loginRequiredVisible}
                    executeClickOut={this.executeClickOut}
                  >
                    <AddToCartButton
                      handleSubmit={
                        this.props.isAuthenticated
                          ? () =>
                              this.handleAddToCart(
                                this.props.match.params.productID,
                                this.state.quantity,
                                this.props.userData.id,
                                this.convertToDBSize(this.state.selectedSize)
                              )
                          : this.showLoginRequired
                      }
                      selectedSize={this.state.selectedSize}
                    />
                  </LoginRequired>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    productDetail: state.product.productDetail,
    cartData: state.cart.cartData,
    loading: state.product.loading,
    error: state.product.error,
    isAuthenticated: state.auth.token !== null,
    userData: state.user.userData,
    nav: state.nav.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productDetailGet: (productID, products = null) =>
      dispatch(productActions.productDetailGet(productID, products)),
    cartAddCartItem: (productID, quantity, userID, size) =>
      dispatch(cartActions.cartAddCartItem(productID, quantity, userID, size)),
    cartUpdateProductDetail: (item, additionalQuantity, cartData) =>
      dispatch(
        cartActions.cartUpdateProductDetail(item, additionalQuantity, cartData)
      ),
    cartGet: userID => dispatch(cartActions.cartGet(userID)),
    changeNav: nav => dispatch(navActions.changeNav(nav))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
