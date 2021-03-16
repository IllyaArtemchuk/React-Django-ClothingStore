import React from "react";
import { Badge, Icon } from "antd";
import { connect } from "react-redux";
import * as styles from "../styles/StyleObjects/GeneralStyle";

class ShoppingCartIcon extends React.Component {
  state = {
    count: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.cartData !== prevProps.cartData) {
      this.displayCount();
    }
    if (
      this.props.userData !== prevProps.userData &&
      this.props.userData === null
    ) {
      this.setState({ count: 0 });
    }
  }

  determineStyle = () => {
    if (this.props.nav === "2") {
      return {
        fontSize: 13,
        marginLeft: -5,
        backgroundColor: "white",
        borderColor: "white",
        fontWeight: "bold",
        color: "#95cc43"
      };
    } else {
      return {
        fontSize: 13,
        marginLeft: -5,
        fontWeight: "bold",
        borderColor: "#ACC1A6",
        color: "#114C00",
        backgroundColor: "#ACC1A6"
      };
    }
  };

  displayCount = () => {
    if (!this.props.cartData || this.props.cartData.items.length === 0) {
      this.setState({
        count: 0
      });
    } else {
      let finalCount = 0;
      this.props.cartData.items.forEach(item => {
        finalCount += item.quantity;
      });
      this.setState({
        count: finalCount
      });
    }
  };
  render() {
    return (
      <Badge count={this.state.count} style={this.determineStyle()}>
        <Icon type="shopping-cart" style={styles.headerIcon} />
      </Badge>
    );
  }
}

export const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    userData: state.user.userData,
    nav: state.nav.nav
  };
};

export default connect(mapStateToProps)(ShoppingCartIcon);
