import React from "react";
import { List, Icon, Spin, Row } from "antd";
import ProductCard from "./ProductCard";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ProductListSmall extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Row>
        {!this.props.data ? (
          <Spin indicator={antIcon} />
        ) : (
          <List
            grid={{
              gutter: { xs: 10, sm: 160, md: 140, lg: 100, xl: 140, xxl: 80 },
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 4,
              xxl: 4
            }}
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item style={{ minWidth: 230, maxWidth: 390 }}>
                <ProductCard item={item} windowSize={this.props.windowSize} />
              </List.Item>
            )}
          />
        )}
      </Row>
    );
  }
}

export default ProductListSmall;
