import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Popup extends Component {

  render() {
    const { ui } = this.props;

    return (
      <div className="popup">
        <div className="popup-background-filter"></div>
        <div className="popup-box">
          <h5>{ui.popup.title}</h5>
          <p>{ui.popup.body}</p>
          <div className="button">
            <a href={ui.popup.button_link}>{ui.popup.button_text}</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

export default connect(mapStateToProps, null)(Popup);
