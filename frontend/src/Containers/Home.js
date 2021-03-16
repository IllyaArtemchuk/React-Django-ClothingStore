import React from "react";
import { Col, Row, Typography, Spin, Icon } from "antd";
import ProductListSmall from "../Components/ProductListSmall";
import { connect } from "react-redux";
import * as navActions from "../store/actions/navBar";
import * as productActions from "../store/actions/product";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Home extends React.Component {
  componentDidMount() {
    if (this.props.nav !== null) {
      this.props.changeNav(null);
    }
    if (this.props.products === null) {
      this.props.productGet();
    }
  }

  filterProductData = (param, value) => {
    console.log(this.props.products);
    let products = this.props.products;
    let filtered = products.filter(product => product[param] === value);
    return filtered.slice(0, 4);
  };

  render() {
    return (
      <Row>
        {!this.props.products ? (
          <Spin indicator={antIcon} />
        ) : (
          <Row>
            {this.props.size === "ultrasmall" ? null : <Col span={3} />}
            <Col span={this.props.size === "ultrasmall" ? 23 : 16}>
              <Row>
                <Typography.Title
                  style={{
                    color: "#114C00",
                    fontSize: 50,
                    minWidth: 350,
                    textAlign: "Center"
                  }}
                >
                  New Arrivals
                </Typography.Title>
              </Row>
              <Row>
                <ProductListSmall
                  data={this.filterProductData("tag", "NEW")}
                  windowSize={this.props.size}
                />
              </Row>
              <Row>
                <Row>
                  <Typography.Title
                    style={{
                      color: "#b0130b",
                      fontSize: 50,
                      minWidth: 350,
                      textAlign: "Center"
                    }}
                  >
                    Hot Items
                  </Typography.Title>
                </Row>
                <ProductListSmall
                  data={this.filterProductData("tag", "HOT")}
                  windowSize={this.props.size}
                />
              </Row>
            </Col>
            <Col span={3} />
          </Row>
        )}
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav.nav,
    size: state.size.size,
    products: state.product.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNav: nav => dispatch(navActions.changeNav(nav)),
    productGet: () => dispatch(productActions.productGet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
