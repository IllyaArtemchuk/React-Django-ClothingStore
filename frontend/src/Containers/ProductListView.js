import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import ProductList from "../Components/ProductList";
import ProductCarousel from "../Components/Carousel";
import * as actions from "../store/actions/product";

class ProductListView extends React.Component {
  componentDidMount() {
    this.props.productGet();
  }

  render() {
    return (
      <Row>
        <Col span={5}></Col>
        <Col span={20}>
          <ProductCarousel data={this.props.products} />
        </Col>
        <Col span={4}></Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    error: state.product.error,
    products: state.product.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    productGet: () => dispatch(actions.productGet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListView);
