import React, { Component } from 'react';
import Title from '../components/Articles/Title.jsx'
import Intro from '../components/Articles/Intro.jsx'
import Paragraph from '../components/Articles/Paragraph.jsx'
import img18 from '../images/bottom-end.png';

export default class AdrianneHo extends Component {

  render() {
    return (
      <div className="page page-2ccm-article">
        <Title titleValue="重要通知" />

        <Paragraph paragraphValue="经过1个月的试运营，2ccm余额系统得到了大家的高度认可和广泛使用，为了持续提升我们的服务质量，和优化您的充值和支付体验，我们决定在最新更新的余额系统中取消提现功能，并加大余额支付享受的折扣优惠。" />

        <Paragraph paragraphValue="为了让现有充值用户顺利过渡到新版余额系统，您依然可以在接下来的几天内继续操作提现，我们正式停止提现服务的时间节点为：2018年3月9日 23时59分59秒。超过此时间节点的提现申请将不再予以处理。" />

        <Paragraph paragraphValue="感谢您的理解和支持，2ccm余额系统是为大家提供折扣优惠和便捷支付的渠道，我们会持续更新和维护来优化您的购物体验，谢谢！" />
        <div className="article-end">
          <img src={img18} className="article-end-logo" height="18" />
        </div>
      </div>
    );
  }
}
