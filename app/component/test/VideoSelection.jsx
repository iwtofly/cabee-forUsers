import React from 'react'
import pubsub from 'pubsub-js'

// VideosSelection consumes messages from the topic 'videos'
// and displays the current selected Videos
var VideoSelection = React.createClass({
  getInitialState: function() {
    return { selection: 'none' };
  },
  componentWillMount: function() {
    // when React renders me, I subscribe to the topic 'Videos'
    // .subscribe returns a unique token necessary to unsubscribe
    this.pubsub_token = pubsub.subscribe('videos', function(topic, Videos) {
      // update my selection when there is a message
      this.setState({ selection: Videos });
    }.bind(this));
  },
  componentWillUnmount: function() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    pubsub.unsubscribe(this.pubsub_token);
  },
  render: function() {
    return (<div>You have selected the Videos : {this.state.selection};</div>)
  }
});

export default VideoSelection;