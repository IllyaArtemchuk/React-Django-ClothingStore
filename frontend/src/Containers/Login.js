import { Form, Icon, Input, Button, Spin, Row, Col, Typography } from "antd";
import * as styles from "../styles/StyleObjects/GeneralStyle";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/navBar";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password);
      }
    });
  };

  componentDidMount() {
    if (this.props.nav !== "1") {
      this.props.changeNav("1");
    }
    this.props.resetError();
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
      if (this.props.error.message === "Request failed with status code 400") {
        errorMessage = (
          <Typography.Title
            level={4}
            style={{ textAlign: "center", color: "#114C00" }}
          >
            Invalid Login Credentials
          </Typography.Title>
        );
      } else {
        errorMessage = <p>{this.props.error.message}</p>;
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={10} />
        <Col span={4} style={{ minWidth: 240 }}>
          {this.props.loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <div>
              <Typography.Title style={styles.TitleLight}>
                {" "}
                Login{" "}
              </Typography.Title>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!"
                      }
                    ]
                  })(<Input type="email" placeholder="email" name="email" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Login
                  </Button>
                  Or
                  <NavLink
                    style={{ marginRight: "10px", marginLeft: "8px" }}
                    to="/signup/"
                  >
                    Sign Up
                  </NavLink>
                </Form.Item>
              </Form>
              {errorMessage}
            </div>
          )}
        </Col>
        <Col span={10}></Col>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    nav: state.nav.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
    resetError: () => dispatch(actions.resetError()),
    changeNav: nav => dispatch(navActions.changeNav(nav))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
