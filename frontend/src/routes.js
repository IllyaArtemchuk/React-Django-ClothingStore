import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Signup from "./Containers/Signup";
import ProductDetail from "./Containers/ProductDetailView";
import ProductSearchView from "./Containers/ProductSearchView";
import Profile from "./Containers/ProfileView";
import Cart from "./Containers/CartView";
import OrderDetail from "./Containers/OrderDetailView";
import PrivateRoute from "./SpecialRoutes/PrivateRoute";
import AuthenticationRoute from "./SpecialRoutes/AuthenticationRoute";

const BaseRouter = () => (
  <div>
    <AuthenticationRoute exact path="/login" component={Login} />
    <AuthenticationRoute exact path="/signup" component={Signup} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/product/:productID" component={ProductDetail} />
    <Route exact path="/products/" component={ProductSearchView} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/order/:orderID" component={OrderDetail} />
    <PrivateRoute exact path="/cart" component={Cart} />
  </div>
);

export default BaseRouter;
