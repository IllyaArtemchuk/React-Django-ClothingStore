import React from "react";
import { Form, Input, Icon, Button, Typography, Row, Col } from "antd";
import * as styles from "../styles/StyleObjects/GeneralStyle";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
const { Title } = Typography;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.email, values.password, values.confirm);
        this.props.this.props.history.push("/home");
      }
      if (err) {
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  handleError = () => {
    if (this.props.error) {
      if (this.props.error.response.data.email) {
        return this.props.error.response.data.email;
      } else {
        return this.props.error.message;
      }
    } else {
      return null;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row>
        <Col span={10} />
        <Col span={4} style={{ minWidth: 250 }}>
          <Title style={styles.TitleLight}>Sign Up</Title>
          <Form onSubmit={this.handleSubmit}>
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
              })(
                <Input
                  placeholder="email"
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="confirm password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Sign Up
              </Button>
              Or
              <NavLink
                style={{ marginRight: "10px", marginLeft: "8px" }}
                to="/login"
              >
                Log In
              </NavLink>
            </Form.Item>
          </Form>
          <Typography>{this.handleError()}</Typography>
        </Col>
        <Col span={10} />
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password1, password2) =>
      dispatch(actions.authSignup(email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
