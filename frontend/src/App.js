import React from "react";
import CustomLayout from "./Containers/Layout";
import { Router } from "react-router-dom";
import BaseRouter from "./routes";
import history from "./history";
import { connect } from "react-redux";
import * as authActions from "./store/actions/auth";
import * as userActions from "./store/actions/user";
import * as cartActions from "./store/actions/cart";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.props.userGet();
    }
    if (
      this.props.userData !== prevProps.userData &&
      this.props.userData !== null
    ) {
      this.props.cartGet(this.props.userData.id);
    }
  }
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    cartData: state.cart.cartData,
    userData: state.user.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    userGet: () => dispatch(userActions.userGet()),
    cartGet: userID => dispatch(cartActions.cartGet(userID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
