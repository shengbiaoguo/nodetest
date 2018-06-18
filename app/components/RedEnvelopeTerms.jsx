import React, { Component } from 'react';

export default class RedEnvelopeTerms extends Component {

  render() {

    return (
        <div className="box">
          <img className="box-title" src="http://resources.2ccm.net/campaign/new-year/box-top-terms.png" />
          <div className="box-content toc">
            <p className="toc-item">
              <span className="list-number">1</span>活动有效期：2018年2月15日（除夕）晚上8点 - 2018年2月22日（初七）晚上零点；
              </p>
            <p className="toc-item">
              <span className="list-number">2</span>活动内容：领取您的专属新年红包并分享给好友，当好友领取您的红包的同时，您也获得一个红包和现金返现；
              </p>
            <p className="toc-item">
              <span className="list-number">3</span>领取的2ccm新年专属红包为无门槛立减200优惠劵，优惠劵有效期为90天，通过分享朋友而获得的红包无数量上限，多分享多获得；
              </p>
            <p className="toc-item">
              <span className="list-number">4</span>朋友每领取一次您分享的红包，我们会随机返现1-10元现金至您的用户余额系统中，返现金额累加上限至200人民币，返现金额属于不可提现金额；
              </p>
            <p className="toc-item">
              <span className="list-number">5</span>注册2ccm app的新老用户均可参与，以手机号码领取的优惠劵可以通过该手机号码注册的2ccm用户查看和使用；
              </p>
            <p className="toc-item">
              <span className="list-number">6</span>2ccm拥有活动最终解释权，祝大家新年快乐，狗富贵，莫相忘；
            </p>
          </div>
          <img className="box-bottom" src="http://resources.2ccm.net/campaign/new-year/box-bottom.jpg" />
        </div>
    );
  }
}