import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as newInActions from '../actions/NewIn';
import moment from 'moment';


let timer = null;

class NewIn extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	countDownTime: new Date().getTime()
	    }
	}
  
  	componentDidMount(){
    	this.props.fetchNewInProductList();

    	timer = setInterval(function(){
    		this.props.countDownTime();
  		}.bind(this),1000)
  	}

  	_calculateTime(seconds){
	    let duration = moment.duration(seconds);
	    return {
	      duration_seconds: this._calculateZero(duration.seconds()),
	      duration_minutes: this._calculateZero(duration.minutes()),
	      duration_hours: this._calculateZero(duration.hours()),
	      duration_days: this._calculateZero(duration.days()),
	    }
	  }

    _calculateZero(num){
     return String(num).length >1 ? num : '0' + num;
    }

  	componentWillUnmount(){
  		window.clearInterval(timer)
  	}

  render() {
    const { productList } = this.props;
    const today = moment().format('YYYY-MM-DD');

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
              productList.map((item, index) => {
                return(
                	<section style={{width: '100%'}} key={index}>
                		{
                			item.date != today &&
                			<p className="date-section-title">
	                			<span>{moment(item.date).format("MM月DD日")}</span>
	                		</p>
                		}
                		
                		{
                			item.products.map((itemProduct) => {
                				return(
                					<a href={`https://2ccm.com/redirect?product_id=${itemProduct.id}`} className="discounts-container" key={itemProduct.id}>
				                      <div className="discounts-content">
				                        <div className="discounts-content-detail" style={{backgroundImage: "url('" + itemProduct.cover_image + "')"}}>
				                        {	
				                        	itemProduct.countDown && 
				                          	<span className="start-sale-time overflow-hidden">剩余{this._calculateTime(itemProduct.countDown *1000).duration_hours}:{this._calculateTime(itemProduct.countDown *1000).duration_minutes}:{this._calculateTime(itemProduct.countDown *1000).duration_seconds}开售</span>
				                        }
				                        </div>
				                      </div>
				                      <div className="discounts-brand overflow-hidden">{itemProduct.brand}</div>
				                      <div className="discounts-name overflow-hidden">{itemProduct.name}</div>
                              {
                                itemProduct.discount_price && 
                                <div className="discounts-price-container">
                                  <span className="price-detail">{`¥${Math.ceil(itemProduct.discount_price / 100)}`}</span>
                                  <span className="discounts-price">
                                    (¥<span style={{textDecoration: 'line-through'}}>{Math.ceil(itemProduct.price / 100)}</span>)
                                  </span>
                                </div>
                              }
				                      
                                
                                {
                                  !itemProduct.discount_price &&
                                  <div className="discounts-price-container">
                                    <span className="price-detail">{`¥${Math.ceil(itemProduct.price / 100)}`}</span>
                                  </div>
                                }
				                    </a>
                				)
                			})
                		}
                		
                	</section>
                )
              })
          	}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      productList: state.new_in.productList
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(newInActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIn);
