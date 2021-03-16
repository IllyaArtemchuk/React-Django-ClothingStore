import React from "react";
import { Tag } from "antd";

class CartQuantity extends React.Component {
  state = {
    quantity: null
  };

  componentDidMount() {
    this.findQuantity();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedSize !== prevProps.selectedSize ||
      this.props.cartData !== prevProps.cartData
    ) {
      this.findQuantity();
    }
  }

  findQuantity = () => {
    let DBSize = this.props.convertToDBSize(this.props.selectedSize);
    let found = this.props.cartData.items.find(
      item =>
        item.item.id === this.props.productDetail.id && item.size === DBSize
    );

    if (found !== undefined) {
      this.setState({
        quantity: found.quantity
      });
    } else {
      this.setState({
        quantity: null
      });
    }
  };

  render() {
    return (
      <span>
        {this.state.quantity ? (
          <Tag
            color="green"
            style={{ fontSize: 13, marginLeft: 20, verticalAlign: "30%" }}
          >
            {`${this.state.quantity} In Cart`}
          </Tag>
        ) : null}
      </span>
    );
  }
}

export default CartQuantity;
