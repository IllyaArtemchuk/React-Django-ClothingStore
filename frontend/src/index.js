import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import productReducer from "./store/reducers/product";
import userReducer from "./store/reducers/user";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import sizeReducer from "./store/reducers/size";
import navReducer from "./store/reducers/navBar";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  size: sizeReducer,
  nav: navReducer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
