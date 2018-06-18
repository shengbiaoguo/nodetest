import React, { Component } from 'react';

export default class BottomTitle extends Component {

  render() {
    return (
      <div className="article-bottom-title">
        <span className="content">
          {this.props.bottomTitleValue}
        </span>
      </div>
    );
  }
}
