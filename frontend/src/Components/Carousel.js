import React from "react";
import { Carousel, Icon, Spin } from "antd";
import "../styles/carousel.css";
import ProductList from "./ProductList";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ProductCarousel extends React.Component {
  carouselAmount = () => {
    let NumOfProductsDisplayed = 4;
    var filteredData = this.props.data.filter(
      item => item[this.props.filterType] == this.props.filterParameter
    );
    if (filteredData.length > NumOfProductsDisplayed) {
      const dataLength = filteredData.length;
      let starter = 0;
      let numArray = [];
      while (starter < dataLength && numArray.length < 3) {
        numArray.push(starter);
        starter = starter + NumOfProductsDisplayed;
      }
      return (
        <Carousel
          dots="true"
          autoplay
          autoplaySpeed={4000}
          style={{ minHeight: 200 }}
        >
          {numArray.map(num => (
            <div key={num}>
              <ProductList
                data={filteredData.slice(num, num + NumOfProductsDisplayed)}
              />
            </div>
          ))}
        </Carousel>
      );
    } else {
      return <ProductList data={filteredData} />;
    }
  };
  render() {
    return (
      <div>
        {!this.props.data ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>{this.carouselAmount()}</div>
        )}
      </div>
    );
  }
}

export default ProductCarousel;
