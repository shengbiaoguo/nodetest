import React, { Component } from 'react';

export default class Paragraph extends Component {

  render() {
    return (
      <div className="article-paragraph">
        {
            this.props.paragraphValue
        }
      </div>
    );
  }
}