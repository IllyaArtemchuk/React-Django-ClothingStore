import React from "react";
import { List, Row, Typography } from "antd";

class OrderList extends React.Component {
  render() {
    return (
      <List
        itemLayout="vertical"
        pagination={{
          onChange: page => {},
          pageSize: 4
        }}
        dataSource={this.props.orders}
        renderItem={order => (
          <List.Item key={order.id}>
            <List.Item.Meta
              title={
                <a href={`/order/${order.order_id}/`}>#{order.order_id}</a>
              }
              description={`Total: $${order.total}`}
            />
            <Row style={{ marginTop: -15 }}>
              {order.items.map(item => (
                <Typography
                  key={item.id}
                >{`${item.quantity} of ${item.item.name}`}</Typography>
              ))}
            </Row>
          </List.Item>
        )}
      />
    );
  }
}

export default OrderList;
