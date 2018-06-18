import React, { Component } from 'react';

export default class Intro extends Component {

  render() {
    return (
      <div className="article-intro">
        {
            this.props.introValue
        }
      </div>
    );
  }
}
