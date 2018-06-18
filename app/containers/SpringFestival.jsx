import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { receiveCoupon, getUserCouponCode, spreadList, signShared, } from '../actions/SpringFestival';
import RedEnvelopeTerms from '../components/RedEnvelopeTerms.jsx';
import SpringFestivalTips from '../components/SpringFestivalTips.jsx';
import Permission from '../services/Permission';
import queryString from 'query-string';

let _this = null;
let red_enevlope = "getRedEnevlope";

class SpringFestival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigned: null,
      begin_time: "2018-02-15 20:00:00",
      end_time: "2018-02-22 23:59:59",
      duration_seconds: null,
      duration_minutes: null,
      duration_hours: null,
      duration_days: null,
      campagain_closed: false
    }
    self = this;
    this.userToken = null;
    this.userId = null;
    this.timer = null;

    this._fetchSpreadList = this._fetchSpreadList.bind(this);
    this._setLocalStorage = this._setLocalStorage.bind(this);
    this._getRedEnevlope = this._getRedEnevlope.bind(this);
    this._handleFireShare = this._handleFireShare.bind(this);
  }

  _calculateTime() {
    let now_time = moment();
    let duration = null;

    if (now_time < moment(this.state.begin_time)) {
      duration = moment.duration(moment(this.state.begin_time) - now_time);
    } else if (now_time >= moment(this.state.begin_time) && now_time < moment(this.state.end_time)) {
      duration = moment.duration(moment(this.state.end_time) - now_time);
    } else {
      duration = now_time;
    }

    this.setState({
      duration_seconds: duration.seconds(),
      duration_minutes: duration.minutes(),
      duration_hours: duration.hours(),
      duration_days: duration.days(),
    })
  }

  componentDidMount(){
    const params = queryString.parse(this.props.location.search);

    if (moment() < moment(this.state.end_time)) {       //开始倒计时
      this._calculateTime();
      this.timer = setInterval(function () {
        if(moment() > moment(this.state.end_time)){
          this.setState({
            campagain_closed: true,
          });
        }
        this._calculateTime();
      }.bind(this), 1000);
    } else if (moment() >= moment(this.state.end_time)){   //结束倒计时
      this.setState({
        campagain_closed: true,
      })
    }

    //如果已经登录(活动未过期)
    if(params.ios_token && !this.props.campagain_closed){
      let result = Permission.verifyJwt(params.ios_token);
      let userToken = result.userToken;
      let userId = result.userId;
      let localData = this._getLocalStorage(red_enevlope);

      this.userId = userId;

      if(userToken){
        this.userToken = userToken;
        //本地没存
        this.props.getUserCouponCode(userToken, (extend_code)=>{
          this._setLocalStorage(red_enevlope, {extend_code, user_id: this.userId, is_shared: false});
        });
      }
      this.setState({isSigned: true});

      //已经领取红包
      if (localData && localData.extend_code && (localData.user_id === this.userId) && localData.is_shared) {
        this.props.signShared(localData.extend_code, ()=>this.props.spreadList(this.userToken));
      } else {
        this.props.spreadList(userToken,(receive)=>{
          if(receive){
            this.props.signShared(true);
            let localData = this._getLocalStorage(red_enevlope);
            const newLocalData = Object.assign({}, localData, {is_shared: true});
            this._setLocalStorage(red_enevlope, newLocalData);
            }
          }
        )
      }
    }

    //绑定ios微信分享回调方法
    window.shareCallback2 = function(b) {
      if(b){
        //微信分享成功回调
        self.props.spreadList(self.userToken);
      }
    }
  }

  //领取红包
  _getRedEnevlope(){
    let userToken = this.userToken;
    let localData = this._getLocalStorage(red_enevlope);
    if(this.state.isSigned){
      this.props.receiveCoupon(userToken,()=>{
        const newLocalData = Object.assign({}, localData, {is_shared: true});
        this._setLocalStorage(red_enevlope, newLocalData);
        this.props.spreadList(userToken)
      });
    }else{
      this.setState({isSigned:false})
    }
  }

  //推广列表
  _fetchSpreadList(){
    let userToken = this.userToken;
    this.props.spreadList(userToken);
  }

  //ios接口方法（微信分享）
  _handleFireShare() {
    if(window.webkit && window.webkit.messageHandlers) {
      let extend_code = this.props.extend_code;
      window.webkit.messageHandlers.Share.postMessage({ url: "https://campaign.2ccm.net/red-envelope?code=" + extend_code });
    } else {
      console.log('error')
    }
  }

  _setLocalStorage(key, value){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  _getLocalStorage(key){
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  _clearLocalStorage(key){
    return localStorage.clear(key);
  }

  render() {

    return (
      <div className="page page-new-year">
        <div className="head-image"></div>
        <div className="main-section breath-top">
          {
            this.state.campagain_closed &&
            <div className="box count-down"> {/* 活动已结束 */}
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="title">春节红包现金返现活动已结束</p>
                <p className="value">下载2ccm app，关注2ccm微博，微信公众号，第一时间获取最新的优惠信息和活动。</p>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          }

          {
            !this.state.campagain_closed && moment() < moment(this.state.begin_time) &&
            <div className="box count-down"> {/* 倒计时中，活动还未开始 */}
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="title">距离活动开始还有:</p>
                <p className="value">{this.state.duration_days}天 {this.state.duration_hours}小时 {this.state.duration_minutes}分钟 {this.state.duration_seconds}秒</p>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          }

          {
            !this.state.campagain_closed && moment() >= moment(this.state.begin_time) && !this.props.is_receive_coupon &&
            <div className="box"> {/* 还未领取红包 */}
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="coupon-notice">领取成功后分享，朋友成功领取您的红包后，您同时也会再获得一个红包和我们给您准备的随机现金返现。</p>
                <div onClick={this._getRedEnevlope} className="red-envelope-button"></div>
                {
                  (this.state.isSigned == false) &&
                  <p className="no-signed-tips">请注册并登录2ccm账号来参与新春红包活动</p>
                }
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          }



          {
            !this.state.campagain_closed && moment() >= moment(this.state.begin_time) && this.props.is_receive_coupon &&
            <div className="box"> {/* 领取成功 */}
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-received.png" />
              <div className="box-content received-coupon">
                <h2>恭喜您！</h2>
                <p className="notice">您已经成功领取了2ccm迎新春优惠红包！进入个人中心-钱包-优惠劵查看，分享给好友可以获得更多红包和现金返现。</p>
                <p className="value">¥200</p>
                <div className="share-button" onClick={this._handleFireShare}>分享给好友</div>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          }

          {
            !this.state.campagain_closed && moment() >= moment(this.state.begin_time) && moment() < moment(this.state.end_time) &&
            <div className="box count-down"> {/* 活动结束倒计时 */}
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content coupon">
                <p className="title">距离活动结束还有:</p>
                <p className="value">{this.state.duration_days}天 {this.state.duration_hours}小时 {this.state.duration_minutes}分钟 {this.state.duration_seconds}秒</p>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          }


          {
            !this.state.campagain_closed && moment() >= moment(this.state.begin_time) && this.props.user_spread_data && this.props.user_spread_data.receive > 0 &&
            <div className="box"> {/* 统计 */}
              <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-red-envelope.png" />
              <div className="box-content statistics">
                <h2>您的福利统计</h2>
                <div className="number-row">
                  <div className="number-item">
                    <span className="title">您的专属红包</span>
                    <p className="value">{this.props.user_spread_data.receive}<small>（个）</small></p>
                  </div>
                  <div className="number-item">
                    <span className="title">通过分享获得红包</span>
                    <p className="value">{this.props.user_spread_data.invitation}<small>（个）</small></p>
                  </div>
                  <div className="number-item">
                    <span className="title">领取好友的红包</span>
                    <p className="value">{this.props.user_spread_data.receive_from_other_share}<small>（个）</small></p>
                  </div>
                  <div className="number-item">
                    <span className="title">您共获得返现</span>
                    <p className="value">¥{this.props.user_spread_data.cashback / 100}<small>（元）</small></p>
                  </div>
                </div>
              </div>
              <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
            </div>
          }


          <SpringFestivalTips />
          <RedEnvelopeTerms />
        </div>

      </div>
    );
  }
}


function mapStateToProps(state) {
    return {
      is_receive_coupon: state.spring_festival.is_receive_coupon, //已经领过
      extend_code: state.spring_festival.extend_code,           //优惠码
      user_spread_data: state.spring_festival.user_spread_data,   //分享后列表数据
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({receiveCoupon, getUserCouponCode, spreadList, signShared}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SpringFestival);
