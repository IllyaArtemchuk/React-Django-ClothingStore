import React from "react";
import { List, Icon, Spin } from "antd";
import ProductCard from "./ProductCard";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NewProductList extends React.Component {
  render() {
    return (
      <div>
        {!this.props.data ? (
          <Spin indicator={antIcon} />
        ) : (
          <List
            grid={{ gutter: 200, column: 5 }}
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item style={{ minWidth: 250 }}>
                <ProductCard item={item} />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default NewProductList;
