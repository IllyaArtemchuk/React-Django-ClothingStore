import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Row, Col, Typography } from "antd";
import * as productActions from "../store/actions/product";
import * as navActions from "../store/actions/navBar";
import ProductList from "../Components/ProductList";

class ProductSearchView extends React.Component {
  state = {
    data: null
  };
  componentDidMount() {
    if (!this.props.products) {
      this.props.productGet();
    } else {
      this.filterData();
    }
    if (this.props.nav !== null) {
      this.props.changeNav(null);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.filterData();
    }

    if (this.props.location.search !== prevProps.location.search) {
      this.filterData();
    }
  }

  filterData = () => {
    const searchParams = queryString.parse(this.props.location.search);
    let productData = this.props.products;
    if (searchParams.for) {
      let parsedFor = searchParams.for === "men" ? "MALE" : "FEMALE";
      productData = productData.filter(
        item => item.gender === parsedFor || item.gender === "UNISEX"
      );
    }
    if (searchParams.type) {
      let parsedSearch = searchParams.type.toUpperCase();
      productData = productData.filter(item => item.type === parsedSearch);
    }
    this.setState({
      data: productData
    });
  };

  generateTitle = () => {
    const searchParams = queryString.parse(this.props.location.search);
    function firstLetterUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    let forQuery = `${firstLetterUpper(searchParams.for)}`;
    if (searchParams.for && searchParams.type) {
      let type = `${firstLetterUpper(searchParams.type)}${
        searchParams.type === "shirt" ? "s" : ""
      }`;
      return `${forQuery}'s ${type}`;
    } else if (searchParams.for && !searchParams.type) {
      return `${forQuery}'s Items`;
    }
  };

  render() {
    return (
      <Row>
        <Col span={3} />
        <Col span={16}>
          <Row>
            <Typography.Title
              style={{ color: "#114C00", fontSize: 50, minWidth: 350 }}
            >
              {this.generateTitle()}
            </Typography.Title>
          </Row>
          <Row>
            <ProductList data={this.state.data} />
          </Row>
        </Col>
        <Col span={3} />
      </Row>
    );
  }
}
export const mapStateToProps = state => {
  return {
    products: state.product.products,
    nav: state.nav.nav
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    productGet: () => dispatch(productActions.productGet()),
    changeNav: nav => dispatch(navActions.changeNav(nav))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearchView);
