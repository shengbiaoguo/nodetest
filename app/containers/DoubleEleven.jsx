import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DoubleElevenActions from '../actions/DoubleEleven';
import moment from 'moment';

const height = window.screen.height;
let timeOut = null;
let self = null;

class DoubleEleven extends Component {
  constructor() {
    super();
    self = this;
    this.page = 1;
    this.per_page = 50;
    this.total_page = 567;
  }

  componentDidMount(){
    window.addEventListener('scroll', this.scrollLoad);
    this.props.doubleElevenActivityList(this.page, this.per_page);
  }

  scrollLoad(){
    timeOut && window.clearTimeout(timeOut);
    timeOut = setTimeout(function () {
          self.loadMore()
        }, 200
    )
  }

  loadMore(){
      if(parseInt(this.total_page / this.per_page) < this.page) return;

      let y = window.scrollY,
          h = document.getElementById("page-double-eleven").offsetHeight;

      if(height + y > h - 3000){
          this.props.doubleElevenActivityList(++this.page, 50);
      }
  }

  componentWillUnmount(){
      window.removeEventListener('scroll',this.scrollLoad)
  }

  render() {
    const { productList } = this.props

    return (
      <div className="page page-double-eleven" id="page-double-eleven">
          {
            productList && productList.length == 0 &&
            <div className="loading-container">
              <div className="loading">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          }

          {
              productList && productList.length >0 &&
              productList.map((item) => {
                return(
                    <a href={`https://2ccm.com/redirect?product_id=${item.id}`} className="discounts-container" key={item.id}>
                      <div className="discounts-content">
                        <div className="discounts-content-detail" style={{backgroundImage: "url('" + item.cover_image + "')"}}>
                          <span className="start-sale-time overflow-hidden">{`${moment(item.start_sale_time * 1000).format("MM月DD日 HH:mm")} 开售`}</span>
                        </div>
                      </div>
                      <div className="discounts-brand overflow-hidden">{item.brand}</div>
                      <div className="discounts-name overflow-hidden">{item.name}</div>
                      <div className="discounts-price-container">
                        <span className="price-detail">{`¥${Math.ceil(item.discount_price / 100)}`}</span>
                        <span className="discounts-price">
                          (¥<span style={{textDecoration: 'line-through'}}>{Math.ceil(item.price / 100)}</span>)
                        </span>
                      </div>
                      <span className="tips">{`-${Math.ceil((1-item.discount_price / item.price) * 100)}%`}</span>
                    </a>
                )
              })
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      productList: state.double_eleven.productList
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DoubleElevenActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DoubleEleven);
