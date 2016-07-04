/**
 * It is a test for 'pubsub-js',in order to realize the communication bettween two components that are not related.
 */
import React from 'react'
import pubsub from 'pubsub-js'
import VideoSelection from './VideoSelection.jsx'
// VideosList is just a container
var VideoList = React.createClass({
  render: function() {
    return ( <div>
              <VideoSelection />
              <Videos name="VIDEO 1" />
              <Videos name="VIDEO 2" />
              <Videos name="VIDEO 3" />
            </div> )
  }
});


var Videos = React.createClass({
  onclick: function() {
    // when a Videos is clicked on, we publish a message on the topic 'videos' and we pass the Video name
    pubsub.publish('videos', this.props.name);
  },
  render: function() {
    return <div onClick={this.onclick}>{this.props.name}</div>;
  }
});
// A Videos is just a <div> which publish a message to the topic 'videos'
// when you click on it
export default VideoList;