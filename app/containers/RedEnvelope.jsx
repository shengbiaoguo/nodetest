import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as RedEnvelopeActions from '../actions/RedEnvelope';
import RedEnvelopeTerms from '../components/RedEnvelopeTerms.jsx'
import queryString from 'query-string';

class RedEnvelope extends Component {
  constructor() {
    super();
    this.state = {
      country_code: "86",
      phone_number: "",
      format_error: false,
      begin_time: "2018-01-15 20:00",
      duration_seconds: null,
      duration_minutes: null,
      duration_hours: null,
      duration_days: null,
      campagain_closed: false,
      is_collecting: false,
      share_code: null,
      sharer_name: null
    }
    this._formFieldUpdate = this._formFieldUpdate.bind(this);
  }

  componentDidMount() {
    const queryData = queryString.parse(this.props.location.search);
    this.setState({
      share_code: queryData.code,
      sharer_name: queryData.sharer
    })
    if (moment() < moment(this.state.begin_time)) {
      this._calculateTime();
      setInterval(function () {
        this._calculateTime();
      }.bind(this), 1000);
    }

    if(queryData && queryData.code && queryData.sharer){
      this.setState({
        extend_code: queryData.code,
        sharerName: queryData.sharer,
      })
    }
  }

  _calculateTime() {
    let duration = moment.duration(moment(this.state.begin_time) - moment());
    this.setState({
      duration_seconds: duration.seconds(),
      duration_minutes: duration.minutes(),
      duration_hours: duration.hours(),
      duration_days: duration.days(),
    })
  }

  _formFieldUpdate(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  _collectCoupon() {
    if(this.state.phone_number.length > 15 || this.state.phone_number.length < 8){
      this.setState({format_error:true})
    }else{
      this.setState({ is_collecting: true, format_error: false })
      let phone_number = "+" + this.state.country_code + " " + this.state.phone_number
      this.props.collectCouponWithPhoneNumber(phone_number, this.state.share_code);
    }
  }

  render() {
    return (
      <div className="page page-new-year">
        <div className="head-image"></div>
        {
          this.state.campagain_closed &&
          <div className="main-section count-down breath-top">
            <div className="box">
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="title">春节红包现金返现活动已结束</p>
                <p className="value">下载2ccm app，关注2ccm微博，微信公众号，第一时间<br />获取最新的优惠信息和活动</p>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          </div>
        }


        {
          !this.state.campagain_closed && moment() < moment(this.state.begin_time) &&
          <div className="main-section count-down breath-top">
              <div className="box">
                <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
                <div className="box-content coupon">
                <p className="title">距离活动开始还有:</p>
                <p className="value">{this.state.duration_days}天 {this.state.duration_hours}小时 {this.state.duration_minutes}分钟 {this.state.duration_seconds}秒</p>
                </div>
                <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
              </div>
          </div>
        }


        {
          !this.state.campagain_closed && moment() >= moment(this.state.begin_time) && !this.props.red_envelope.done_request &&
          <div className="main-section breath-top">
            <div className="box">
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                {
                  this.state.sharer_name &&
                  <p className="share-text">快来领取 {this.state.sharer_name} 分享给您的2ccm春节红包吧！</p>
                }
                {
                  !this.state.sharer_name &&
                  <p className="share-text">2ccm春节红包发放中，快来领取吧！</p>
                }

                <div className="wrapper">
                  <div className="country_code">
                    <input type="tel" onChange={this._formFieldUpdate} name="country_code" value={this.state.country_code} />
                  </div>
                  <input type="tel" placeholder="请输入手机号码" className="phone" onChange={this._formFieldUpdate} name="phone_number" value={this.state.phone_number} />
                  {
                    !this.state.is_collecting &&
                    <div className="button" onClick={() => this._collectCoupon()}>立即领取</div>
                  }
                  {
                    this.state.is_collecting &&
                    <div className="button grey">领取中...</div>
                  }
                </div>
                {
                  this.state.format_error &&
                  <p className="format-error">手机号码格式有误，请重新输入</p>
                }
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          </div>
        }

        {
          this.props.red_envelope.done_request && this.props.red_envelope.status_ok &&
          <div className="main-section result-message breath-top">
            <div className="box"> 
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="title">恭喜您！</p>
                <p className="value">您已经领取到『{this.state.sharer_name}』分享的¥200优惠劵红包一枚，打开app，登录该手机号码绑定注册的账户查看您的优惠劵红包。</p>
                <a className="goto-button" href="https://www.2ccm.net/redirect">打开app查看</a>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          </div>
        }

        {
          this.props.red_envelope.done_request && this.props.red_envelope.status_error &&
          <div className="main-section result-message breath-top">
            <div className="box">
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="title">已经领取过啦...</p>
                <p className="value">您已成功领取过该红包，打开2ccm app，登录该手机号码绑定注册的账户查看您的优惠劵。</p>
                <a className="goto-button" href="https://www.2ccm.net/redirect">打开app查看</a>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          </div>
        }

        <RedEnvelopeTerms />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    red_envelope: state.red_envelope
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RedEnvelopeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RedEnvelope);
