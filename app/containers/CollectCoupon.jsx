import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CouponActions from '../actions/Coupon';
import moment from 'moment';

class CollectCoupon extends Component {
  constructor() {
    super();
    this.state = {
      country_code: "86",
      phone_number: "",
      upcoming_begining_time: null,
      campaign_day: 3, // Wednesday
      duration_seconds: null,
      duration_minutes: null,
      duration_hours: null,
      duration_days: null,
      is_collecting: false
    }
    this._formFieldUpdate = this._formFieldUpdate.bind(this);
  }

  _set_upcoming_begining_time(){
    let cap_time;
    if (moment().isoWeekday() < this.state.campaign_day) {
      cap_time = moment().isoWeekday(this.state.campaign_day).startOf('day')
    }
    if (moment().isoWeekday() > this.state.campaign_day) {
      cap_time = moment().add(1, 'weeks').isoWeekday(this.state.campaign_day).startOf('day')
    }
    if (moment().isoWeekday() == this.state.campaign_day) {
      cap_time = moment().startOf('day')
    }
    if (this.state.upcoming_begining_time !== cap_time.format('YYYY-MM-DD HH:mm:ss')){
      this.setState({ upcoming_begining_time: cap_time.format('YYYY-MM-DD HH:mm:ss') })
    }
    this._calculateTime(cap_time);
  }

  componentDidMount(){
    this._set_upcoming_begining_time()
    setInterval(function () {
      this._set_upcoming_begining_time()
    }.bind(this), 1000);
  }

  _calculateTime(cap_time){
    let duration = moment.duration(moment(cap_time) - moment());
    this.setState({
      duration_seconds: duration.seconds(),
      duration_minutes: duration.minutes(),
      duration_hours: duration.hours(),
      duration_days: duration.days(),
    })
  }

  _formFieldUpdate(e){
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  _collectCoupon(){
    this.setState({is_collecting: true})
    let phone_number = "+"+this.state.country_code+" "+this.state.phone_number
    this.props.collectCouponWithPhoneNumber(phone_number);
  }

  render() {
    return (
      <div className="page page-coupon">
        <div className="coupon"></div>

        {
          moment() < moment(this.state.upcoming_begining_time) &&
          <div className="phone-field count-down">
            <p className="title">距离下次发放福利还有:</p>
            <p className="value">{this.state.duration_days}天 {this.state.duration_hours}小时 {this.state.duration_minutes}分钟 {this.state.duration_seconds}秒</p>
          </div>
        }

        {
          moment() >= moment(this.state.upcoming_begining_time) &&
          <div className="phone-field count-down">
            <p className="title breath-down">领劵活动正在进行中</p>
            <div className="wrapper">
              <div className="country_code">
                <input type="tel" onChange={this._formFieldUpdate} name="country_code" value={this.state.country_code} />
              </div>
              <input type="tel" placeholder="请输入手机号码" className="phone" onChange={this._formFieldUpdate} name="phone_number" value={this.state.phone_number} />
              {
                !this.state.is_collecting &&
                <div className="button" onClick={()=>this._collectCoupon()}>领劵</div>
              }
              {
                this.state.is_collecting &&
                <div className="button grey">领劵</div>
              }
              
            </div>
          </div>
        }

        <div className="toc">
        	<p className="title">
	        	<span className="line"></span>
	        	<span className="value">周三领劵 <b>·</b> 活动细则</span>
        	</p>
        	<p className="toc-item">
        		<span className="list-number">1</span>每周三定期开放领取优惠劵活动，活动期间每人每次可领取一张优惠劵，供2ccm app内购物使用；
        	</p>
          <p className="toc-item">
            <span className="list-number">2</span>优惠劵有效期：优惠劵领取之日一周以内；
          </p>
        	<p className="toc-item">
        		<span className="list-number">3</span>同一手机号，同一支付账号视为同一用户；
        	</p>
        	<p className="toc-item">
        		<span className="list-number">4</span>注册2ccm app的新老用户均可参与，以手机号码领取的优惠劵可以通过该手机号码注册的2ccm用户查看和使用；
        	</p>
        	<p className="toc-item">
        		<span className="list-number">5</span>2ccm拥有活动最终解释权；
        	</p>
        </div>
        <div className="logo"></div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CouponActions, dispatch)
}

export default connect(null, mapDispatchToProps)(CollectCoupon);
