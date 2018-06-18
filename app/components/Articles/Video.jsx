import React, { Component } from 'react';

export default class Video extends Component {

  render() {
    return (
      <div className="article-video">
        <video className="video" controls
            poster={this.props.poster}
            style={{width: '100%', height: '100%', 'objectFit': 'fill'}}>
            {
                this.props.videoLink &&
                <source src={this.props.videoLink} type="video/mp4" />
            }
        </video>
        {
          this.props.children
        }
      </div>
    );
  }
}
