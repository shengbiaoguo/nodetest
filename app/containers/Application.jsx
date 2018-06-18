import React, { Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import asyncRoute from './asyncRoute.jsx';
const CollectCoupon = asyncRoute(() => import('containers/CollectCoupon.jsx'));
const NewIn = asyncRoute(() => import('containers/NewIn.jsx'));
const AdrianneHo = asyncRoute(() => import('containers/AdrianneHo.jsx'));
const OffwhiteCampaign = asyncRoute(() => import('containers/OffwhiteCampaign.jsx'));

import DevTools from '../utils/DevTools.jsx';
import Popup from '../components/Popup.jsx';
import logo from '../images/logo_2ccm.jpg'

class Application extends Component {

  render() {
    const { ui, match } = this.props;
    return (
      <div className="application-wrapper">
        <Switch>
          <Route exact path="/collect-coupon" component={CollectCoupon} />
          <Route path="/new-in" component={NewIn} />
          <Route path="/adrianne-ho" component={AdrianneHo} />
          <Route path="/offwhite-campaign" component={OffwhiteCampaign} />
          <Redirect to="/new-in" />
        </Switch>

        {
          ui.show_popup &&
          <Popup />
        }

        {
          process.env.NODE_ENV !== 'production' && false &&
          <DevTools />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

export default connect(mapStateToProps, null)(Application);
