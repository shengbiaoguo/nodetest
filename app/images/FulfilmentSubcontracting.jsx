import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changePackageType, changePackageReset } from 'actions/OrderFulfilment';
import T from 'services/translation'
import Price from 'services/price';
import { Select, Tabs, Radio, Button, Checkbox, Modal, Icon } from 'antd';
import PackageItemTabPane from './PackageAndShip/PackageItemTabPane.jsx';
import FulfilmentRepackage from './FulfilmentRepackage.jsx';

const Option = Select.Option;
const TabPane = Tabs.TabPane;

class FulfilmentSubcontracting extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      current_key: 0,
      current_po_id: null,
      rePackageData: null,
    }
  }

  componentDidMount(){
    //default first orderId
    this.setState({
      current_po_id: this.props.order_fulfilment.partner_orders[0].id
    })
  }

  handlePackageTypeChange = (value) => {
    this.props.changePackageType(value)
  }

  _hanleTabClick = (current_key, current_po_id) => {
    this.setState({current_key, current_po_id});
  }

  _showModal = () => {
    this.setState({visible: true})
  }

  _hideModel = () => {
    this.setState({visible: false})
  }

  _handleModelOk = () => {
    let count = 0;
    let items = this.state.rePackageData;
    Object.keys(items).map(doneKey => {
      if(doneKey.indexOf('donePackage')!= -1){
        count += Number(items[doneKey].length);
      }
    })
    console.log(`该订单总共${count}件商品`);
    this.props.changePackageReset(this.state.current_po_id, this.state.rePackageData,
      ()=>this._hideModel())
  }

  _hanleRePackage = (rePackageData) => {
    this.setState({rePackageData})
  }

  render() {
    const { order_fulfilment, package_registered } = this.props;

    return (
      <div className="content subcontract">
        <section className="subcontract-sub-menu">
          <div className="package-types">
            <Select className="top"
              size="large"
              disabled={package_registered}
              defaultValue="poi"
              onChange={this.handlePackageTypeChange}
              >
              <Option value="poi">依据单个商品打包</Option>
              <Option value="po">依据单个订单打包</Option>
            </Select>
          </div>
          <ul className="po-items">
            {
              order_fulfilment.partner_orders.map((po, index) => (
                <li
                  key={index}
                  className={classNames({'active': index === this.state.current_key})}
                  onClick={e => this._hanleTabClick(index, po.id)}
                  >
                  <p className="po-item">
                    <span>姓名：</span>
                    <span className="item-content no-warp-white-space">
                      {po.shipping.receiver_name}
                    </span>
                    {
                      po.hasPacked &&
                      <span style={{float: 'right'}}><Icon type="lock" /></span>
                    }
                  </p>
                  <p className="po-item">
                    <span>订单ID：</span>
                    <span className="item-content no-warp-white-space">
                      {po.order_code}
                    </span>
                  </p>
                  <p className="po-item">
                    <span>数量：</span>
                    <span className="item-content no-warp-white-space">
                      {po.quantity}件商品
                    </span>
                  </p>
                </li>
              ))
            }

          </ul>
        </section>
        <section className="subcontract-container">
          <div className="package-items">
            {
              order_fulfilment.partner_orders.map((item, i) => {
                if(i == this.state.current_key){
                return item.packages.map((packageItem, packageIndex) => (

                    <div className="col-md-6 col-lg-4" key={packageIndex}>
                      <div className="package-box package-item" style={{width: '100%'}}>
                        <div className="meta">
                          <span style={{lineHeight: '40px',paddingLeft: 10}}>共{packageItem.partner_order_items.length}件商品</span>
                          <p>No.{packageItem.id}</p>
                        </div>
                        <div className="fulfilment-package">
                          <div className="wrapper">
                            <div className="shipping-address">
                              <p className="name no-warp-white-space">{packageItem.shipping.receiver_name_en} ({packageItem.shipping.receiver_name})</p>
                              <p className="address no-warp-white-space">{packageItem.shipping.country} {packageItem.shipping.city} {packageItem.shipping.district} {packageItem.shipping.address}</p>
                              <p className="address no-warp-white-space">{packageItem.shipping.country_code}-{packageItem.shipping.postal_code}, {packageItem.shipping.city_en}, {packageItem.shipping.country_en}</p>
                            </div>
                            <div className="product-scroll">
                              {
                                packageItem.partner_order_items.map((poi, poiIndex) => (
                                  <div className="content-row" key={poiIndex}>
                                    <div className="product">
                                      <img src={poi.product_cover_image} />
                                      <p className="brand">{poi.product_brand}</p>
                                      <p className="name">{poi.product_name}</p>
                                      <p className="sku">{T.translate('orderFulfilment.sku')}: {poi.product_sku}</p>
                                      <p className="size">{T.translate('orderFulfilment.color')}: {poi.product_color}; {T.translate('orderFulfilment.size')}: {poi.product_size.value}</p>
                                      <p className="price">{Price.formatString(poi.product_price)}</p>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  ))
                }
              })
            }

          </div>
          {
            !package_registered &&
            <div>
              <div className="package-reset">
                <Button type="primary" size="large" onClick={this._showModal}>重新打包</Button>
              </div>
              <Modal
                style={{ top: 20 }}
                width="80%"
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                visible={this.state.visible}
                onOk={this._handleModelOk}
                onCancel={this._hideModel}
              >
                <FulfilmentRepackage current_po_id={this.state.current_po_id} _hanleRePackage={this._hanleRePackage} />
              </Modal>
            </div>
          }
        </section>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    order_fulfilment: state.order_fulfilment,
    package_registered: state.order_fulfilment.package_registered,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePackageType, changePackageReset }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FulfilmentSubcontracting);
