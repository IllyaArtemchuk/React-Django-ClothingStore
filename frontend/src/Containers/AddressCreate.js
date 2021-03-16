import React from "react";
import {
  Row,
  Form,
  Input,
  Button,
  Col,
  Select,
  Switch,
  Typography,
  message
} from "antd";
import * as userActions from "../store/actions/user";
import { connect } from "react-redux";

const { Option } = Select;

class AddressCreate extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
      }
      if (!err) {
        this.props.addressCreate(
          values.country,
          values.street_address,
          values.zip,
          values.is_default,
          values.apartment_number
        );
        this.props.toggleShowing();
      }
    });
  };

  checkZipLength = (rule, value, callback) => {
    if (value.split("").length > 10) {
      callback("Your zip code is too long!");
    } else {
      callback();
    }
  };

  checkAptLength = (rule, value, callback) => {
    if (value === undefined) {
      return callback();
    } else if (value.split("").length > 4) {
      callback("Your apartment number is too long!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{ marginTop: 10 }}>
        <Typography.Title
          style={{
            borderBottom: "solid",
            borderWidth: 2,
            color: "#114C00",
            borderColor: "#95cc43",
            textAlign: "center"
          }}
          level={3}
        >
          New Address
        </Typography.Title>
        <Form
          onSubmit={this.handleSubmit}
          style={{
            borderBottom: "solid",
            borderWidth: 2,
            borderColor: "#95cc43"
          }}
        >
          <Row>
            <Row>
              <Form.Item label="Address">
                {getFieldDecorator("street_address", {
                  rules: [
                    { required: true, message: "Please input an address" }
                  ]
                })(
                  <Input
                    placeholder="12345 Clothing Street"
                    name="street_address"
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Zip Code">
                  {getFieldDecorator("zip", {
                    rules: [
                      { required: true, message: "A zipcode is required" },
                      {
                        validator: this.checkZipLength
                      }
                    ]
                  })(<Input placeholder="91111" name="zip" />)}
                </Form.Item>
              </Col>
              <Col span={3} />
              <Col span={6}>
                <Form.Item label="Apartment:">
                  {getFieldDecorator("apartment_number", {
                    rules: [
                      {
                        validator: this.checkAptLength
                      }
                    ]
                  })(<Input placeholder="42" name="apartment_number" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={19}>
                <Form.Item label="Select" hasFeedback>
                  {getFieldDecorator("country", {
                    rules: [
                      { required: true, message: "Please select your country!" }
                    ]
                  })(
                    <Select placeholder="Country" name="country">
                      <Option value="CA">Canada</Option>
                      <Option value="US">United States of America</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={1} />
              <Col span={3}>
                <Form.Item label="Default">
                  {getFieldDecorator("is_default", {
                    valuePropName: "checked"
                  })(<Switch name="is_default" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col span={1} />
              <Col span={12}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      backgroundColor: "#114C00",
                      borderColor: "#114C00",
                      fontSize: 17
                    }}
                  >
                    Create
                  </Button>
                </Form.Item>
              </Col>
              <Col span={3} />
              <Col span={4}>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    fontSize: 16
                  }}
                  onClick={this.props.toggleShowing}
                >
                  Nevermind
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addressCreate: (
      country,
      street_address,
      zip,
      isdefault,
      apartment_number
    ) =>
      dispatch(
        userActions.addressCreate(
          country,
          street_address,
          zip,
          isdefault,
          apartment_number
        )
      )
  };
};

const WrappedAddressForm = Form.create({ name: "address" })(AddressCreate);

export default connect(null, mapDispatchToProps)(WrappedAddressForm);
