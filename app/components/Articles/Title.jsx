import React, { Component } from 'react';

export default class Title extends Component {

  render() {
    return (
      <div className="article-title">
        {
            this.props.titleValue
        }
      </div>
    );
  }
}