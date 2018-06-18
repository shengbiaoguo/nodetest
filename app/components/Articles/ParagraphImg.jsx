import React, { Component } from 'react';

export default class ParagraphImg extends Component {

  render() {
    return (
      <div className="article-paragraph-img">
          <img src={this.props.paragraphImg} />
          {
            this.props.children
          }
      </div>
    );
  }
}
