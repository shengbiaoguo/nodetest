import React, { Component } from 'react';
import { Carousel, WhiteSpace } from 'antd-mobile';



export default class CarouselImg extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgHeight: 220
    }
  }

  render(){
    const { imgArray } = this.props
    return(
      <div className="carouselImg">
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
        >
          {imgArray.map(ii => (
            <a
              key={ii}
              href="javascript:;"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={ii}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    )
  }
}
