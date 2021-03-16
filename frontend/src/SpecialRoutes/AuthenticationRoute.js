import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthenticationRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthenticationRoute;
