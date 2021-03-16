import React from "react";
import { Layout, Menu, Typography, Row, Col, Icon, message } from "antd";
import ShoppingCartIcon from "../Components/ShoppingCartIcon";
import ProductNavigation from "./ProductNavigation";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as cartActions from "../store/actions/cart";
import * as userActions from "../store/actions/user";
import * as sizeActions from "../store/actions/size";
import * as navActions from "../store/actions/navBar";
import { Link, withRouter } from "react-router-dom";
import * as styles from "../styles/StyleObjects/GeneralStyle";
const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  state = {
    selectedMenu: "0",
    smallMode: false,
    ultraSmallMode: false
  };

  handleLogout = () => {
    this.props.logout();
    this.props.cartLogout();
    this.props.userLogout();
    message.info("You have been logged out");
  };

  handleClick = e => {
    this.setState({
      selectedMenu: e.key
    });
  };

  handleMenuClick = e => {
    this.props.changeNav(e.key);
  };

  componentDidMount() {
    this.checkWindowSize();
    window.addEventListener("resize", this.checkWindowSize.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.setState({
        selectedMenu: "0"
      });
    }
  }

  checkWindowSize = () => {
    if (window.innerWidth < 550) {
      if (this.props.size !== "ultrasmall") {
        this.props.changeSize("ultrasmall");
      }
    } else if (window.innerWidth < 900) {
      if (this.props.size !== "small") {
        this.props.changeSize("small");
      }
    } else {
      if (this.props.size !== "large") {
        this.props.changeSize("large");
      }
    }
  };

  renderThirdMenuItem = () => {
    if (this.props.size !== "ultrasmall") {
      if (this.props.isAuthenticated) {
        return (
          <Menu.Item
            key="none"
            onClick={this.handleLogout}
            style={{ fontWeight: "bold" }}
          >
            Log Out
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item key="3">
            {" "}
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        );
      }
    }
  };

  render() {
    return (
      <Layout className="layout">
        <Header>
          <Row>
            {this.props.size === "ultrasmall" ||
            this.props.size === "small" ? null : (
              <Col span={3} style={{ minWidth: 260 }}>
                <Typography style={{ marginTop: "5px" }}>
                  <Typography.Title
                    style={{ display: "inline", color: "white" }}
                  >
                    <Link to="/home" style={{ color: "white" }}>
                      Clothing Store
                    </Link>
                  </Typography.Title>
                </Typography>
              </Col>
            )}
            <Col span={1} />
            <Col span={5} style={{ minWidth: 180 }}>
              <ProductNavigation />
            </Col>
            <Col span={1} />
            {this.props.size === "ultrasmall" ? (
              <Col span={3} />
            ) : (
              <Col span={4} />
            )}

            <Col
              span={5}
              justify="end"
              style={
                this.props.size === "ultrasmall"
                  ? { minWidth: 0 }
                  : { minWidth: 180 }
              }
            >
              <Menu
                onClick={this.handleMenuClick}
                theme="dark"
                mode="horizontal"
                selectedKeys={[this.props.nav]}
                style={{
                  lineHeight: "64px",
                  display: "inline"
                }}
              >
                {this.props.isAuthenticated ? (
                  <Menu.Item key="1" style={{ width: 60 }}>
                    <Link to="/profile">
                      <Icon type="user" style={styles.headerIcon} />
                    </Link>
                  </Menu.Item>
                ) : (
                  <Menu.Item key="1">
                    <Link
                      to={{
                        pathname: "/login",
                        state: { prevPath: window.location.pathname }
                      }}
                    >
                      Log In
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item key="2" style={{ width: 70 }}>
                  <Link to="/cart">
                    <ShoppingCartIcon selected={this.state.selectedMenu} />
                  </Link>
                </Menu.Item>
                {this.renderThirdMenuItem()}
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "0 50px",
            background: "#fff"
          }}
        >
          <div
            style={{
              minHeight: "calc(100vh - 140px)",
              padding: 24
            }}
          >
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <a
            href="https://github.com/IllyaArtemchuk"
            style={{ color: "#02A502" }}
          >
            github.com/IllyaArtemchuk
          </a>
        </Footer>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    size: state.size.size,
    nav: state.nav.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout()),
    cartLogout: () => dispatch(cartActions.cartLogout()),
    userLogout: () => dispatch(userActions.userLogout()),
    changeSize: size => dispatch(sizeActions.changeSize(size)),
    changeNav: nav => dispatch(navActions.changeNav(nav))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
