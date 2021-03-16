import React from "react";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import wrapWithClickout from "react-clickout";

class LoginRequired extends React.Component {
  handleClickout() {
    this.props.executeClickOut();
  }
  render() {
    return (
      <Popover
        visible={this.props.visible}
        title="Account Required"
        content={
          <div>
            <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
          </div>
        }
      >
        {this.props.children}
      </Popover>
    );
  }
}

export default wrapWithClickout(LoginRequired);
