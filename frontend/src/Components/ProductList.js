import React from "react";
import { List, Icon, Spin, Row } from "antd";
import ProductCard from "./ProductCard";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ProductList extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Row>
        {!this.props.data ? (
          <Spin indicator={antIcon} />
        ) : (
          <List
            grid={{
              gutter: { xs: 10, sm: 140, md: 60, lg: 65, xl: 130, xxl: 80 },
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 4
            }}
            dataSource={this.props.data}
            pagination={this.props.data.length > 8 ? { pageSize: 8 } : null}
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

export default ProductList;
