import React from 'react';
import ReactDOM from 'react-dom';

import './video.less';


Number.prototype.toVideoDuration = function(){
  var hours, minutes, seconds, group;
  group = []

  hours = Math.floor(this /  3600);
  minutes = Math.floor(this % 3600 / 60);
  seconds = Math.floor(this % 3600 % 60);

  if (hours > 0) { group.push((hours > 9) ? hours : "0" + hours); }
  group.push((minutes > 9) ? minutes : "0" + minutes);
  group.push((seconds > 9) ? seconds : "0" + seconds);

  return group.join(":");
}

var VideoFullScreenToggleButton = React.createClass({
  requestFullscreen: function(){
    this.props.onToggleFullscreen();
  },
  render: function(){
    return (
      <button className="toggle_fullscreen_button" onClick={this.requestFullscreen}>
        <i className="icon-fullscreen"></i>
      </button>
    );
  }
});

var VideoTimeIndicator = React.createClass({
  render: function(){
    var current = (this.props.currentTime+timebefore).toVideoDuration();
    var duration = (this.props.totalDuration).toVideoDuration();
    return (
      <div className="time">
        <span className="current">{current}</span>/<span className="total">{duration}</span>
      </div>
    );
  }
});

var VideoVolumeButton = React.createClass({
  toggleVolume: function(){
    this.props.toggleVolume(!this.props.muted);
  },
  changeVolume: function(e){
    this.props.changeVolume(e.target.value);
  },
  render: function(){
    var volumeLevel = this.props.volumeLevel, level;
      if (volumeLevel <= 0){
        level = 'muted';
      }else if (volumeLevel > 0 && volumeLevel <= 0.33){
        level = 'low';
      }else if (volumeLevel > 0.33 && volumeLevel <= 0.66){
        level = 'medium';
      }else{
        level = 'high';
      }

    var sound_levels = {
      'muted': 'icon-volume-off',
      'low': 'icon-volume-down',
      'medium': 'icon-volume',
      'high': 'icon-volume-up'
    }

    return (
      <div className="volume">
        <button onClick={this.toggleVolume}>
          <i className={sound_levels[level]}></i>
        </button>
        <input className="volume_slider" type="range" min="0" max="100" onInput={this.changeVolume} />
      </div>
    );
  }
});

var VideoPlaybackToggleButton = React.createClass({
  render: function(){
    var icon = this.props.playing ? (<i className="icon-pause"></i>) : (<i className="icon-play"></i>);
    return (
      <button className="toggle_playback" onClick={this.props.handleTogglePlayback}>
        {icon}
      </button>
    );
  }
});

var VideoProgressBar = React.createClass({
  render: function(){
    var playedStyle = {width: this.props.percentPlayed + '%'}
    var bufferStyle = {width: this.props.percentBuffered + '%'}
    return (
      <div className="progress_bar progress_bar_ref" onClick={this.props.handleProgressClick}>
        <div className="playback_percent" style={playedStyle}><span></span></div>
        <div className="buffer_percent" style={bufferStyle}></div>
      </div>
    );
  }
});

var Video = React.createClass({
  updateCurrentTime: function(times){
    this.props.currentTimeChanged(times);
  },
  updateDuration: function(duration){
    this.props.durationChanged(duration);
  },
  playbackChanged: function(shouldPause){
    this.props.updatePlaybackStatus(shouldPause);
  },
  updateBuffer: function(buffered){
    this.props.bufferChanged(buffered);
  },
  componentDidMount: function(){
    console.log("video didmount")
    var video=ReactDOM.findDOMNode(this);
    // console.log(video);

    var $this = this;
    

    // Sent when playback completes
    video.addEventListener('ended', function(e){
      $this.playbackChanged(e.target.ended);
    }, false);

    this.bufferCheck = setInterval(function(){
      var percent=0;
    try{
      // console.log(video.buffered.end(0));
      percent = ((video.buffered.end(video.buffered.length-1)+timebefore) / $this.props.totalDuration * 100);
      // console.log("try"+percent);
      // console.log(video.buffered.length);
    } catch(ex){
      console.log(ex);
      percent = 0;
    }
      $this.updateBuffer(percent);
      if (percent == 100) { clearInterval(this.bufferCheck); }
    }.bind(this), 500);

    video.addEventListener('durationchange', function(e){
      $this.updateDuration(e.target.duration);
    }.bind(this), false);

    video.addEventListener('timeupdate', function(e){
      $this.updateCurrentTime({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    }.bind(this), false)
  },
  componentWillUnmount:function(){
    this.bufferCheck && clearInterval(this.bufferCheck);
    this.bufferCheck = false;
    console.log("video willunmout")
     this.bufferCheck && this.setState({
     loading: false
     });
  },
  render: function(){
    return (
      <video ref="video_test" src={this.props.url} poster={this.props.poster} text={this.props.text} preload="metadata"></video>
    );
  }
});


var VideoPlayer = React.createClass({
  getInitialState: function(){
    var videoDuration = durationCompute(this.props.urlList);
    var totalDuration=videoDuration[this.props.urlList.length-1];
    return {
      videoIndex:0,
      playing: false,
      percentPlayed: 0,
      percentBuffered: 0,
      duration: 0,
      currentTime: 0,
      muted: false,
      volumeLevel: 0.5,
      fullScreen: false,
      videoDuration : videoDuration,
      totalDuration : totalDuration
    };
  },
  componentDidMount:function(){
    console.log("videoplay didmount")
  },
  componentWillUnmount:function(){
    console.log("videoplay willunmount ")
  },
  videoEnded: function(){   
    var urlLength=this.props.urlList.length;
    if(this.state.videoIndex==urlLength-1){
      alert("all end")
      this.setState({
        percentPlayed: 100,
        playing: false,
        videoIndex:0
      },function(){
        ReactDOM.findDOMNode(this.refs.video).pause();
        ReactDOM.findDOMNode(this.refs.video).autoplay=false;
        timebefore=0;
      }.bind(this));
    }else{
      alert("点击确定按钮继续播放视频")
      timebefore+=this.props.urlList[this.state.videoIndex].duration;
      this.setState({
        videoIndex: this.state.videoIndex+1,
        percentPlayed:(this.props.currentTime+timebefore)/this.props.totalDuration,
      },function(){
        ReactDOM.findDOMNode(this.refs.video).play();
        ReactDOM.findDOMNode(this.refs.video).autoplay=true;
      }.bind(this));
    }
  },
  togglePlayback: function(){
    this.setState({
      playing: !this.state.playing
    }, function(){
      if (this.state.playing){
        ReactDOM.findDOMNode(this.refs.video).play()
      }else{
        ReactDOM.findDOMNode(this.refs.video).pause()
      }
    });
  },
  updateDuration: function(duration){
    this.setState({duration: duration});
  },
  updateBufferBar: function(buffered){
    this.setState({percentBuffered: buffered});
  },
  updateProgressBar: function(times){
    var percentPlayed = (100 / this.state.totalDuration) * (times.currentTime+timebefore);
    this.setState({
      currentTime: times.currentTime,
      percentPlayed: percentPlayed,
      duration: times.duration
    });
  },
  toggleMute: function(){
    this.setState({
      muted: !this.state.muted
    }, function(){
      ReactDOM.findDOMNode(this.refs.video).muted = this.state.muted
    });
  },
  toggleFullscreen: function(){
    this.setState({
      fullScreen: !this.state.fullScreen
    }, function(){
      if (this.state.fullScreen){
      var docElm = document.documentElement;
      if(docElm.requestFullscreen){
        ReactDOM.findDOMNode(this).requestFullscreen();
      }     
      if(docElm.webkitRequestFullScreen){
        ReactDOM.findDOMNode(this).webkitRequestFullScreen();
      }
      if(docElm.mozRequestFullScreen){
        ReactDOM.findDOMNode(this).mozRequestFullScreen();
      }
      if(docElm.msRequestFullscreen){
        ReactDOM.findDOMNode(this).msRequestFullscreen();
      }
      }else{
          if(document.exitFullscreen){
      document.exitFullscreen();
      }
      if(document.mozCancelFullScreen){
      document.mozCancelFullScreen();
      }
      if(document.webkitCancelFullScreen){
      document.webkitCancelFullScreen();
      }
      if(document.msExitFullscreen){
      document.msExitFullscreen();
      }
      }
    });
  },
  handleVolumeChange: function(value){
    this.setState({volumeLevel: value / 100}, function(){
      // this.refs.video.getDOMNode().volume = this.state.volumeLevel;
      ReactDOM.findDOMNode(this.refs.video).volume = this.state.volumeLevel;
    });
  },
  seekVideo: function(evt){
  var progress_barElm = evt.target;
  if(progress_barElm.className != 'progress_bar_ref'){
    progress_barElm = evt.target.parentElement;
  };
  
  var progBarDims = progress_barElm.getBoundingClientRect(); //返回元素的大小及其相对于视口的位置
  var clickPos = evt.clientX - progBarDims.left;  // 5 correction factor

  var ratio = this.state.totalDuration/progBarDims.width;
  var seekPos = (clickPos * ratio);


  console.log(seekPos);
  var seekResult=indexJudge(seekPos,this.state.videoDuration);
  timebefore=seekResult.timebefore;
  this.setState({
    videoIndex:seekResult.videoIndex, 
    percentPlayed:seekPos/this.props.totalDuration,
  },function(){
    ReactDOM.findDOMNode(this.refs.video).currentTime = seekPos-timebefore;

  });
    ReactDOM.findDOMNode(this.refs.video).autoplay=true;
  },
  render: function(){
    return (
      <div className="video_player">
        <Video ref="video"
               url={this.props.urlList[this.state.videoIndex].url}
               text={this.props.urlList[this.state.videoIndex].text}
               urlLength={this.props.urlList.length}
               totalDuration={this.state.totalDuration}
               volume={this.state.volumeLevel}
               poster={this.props.urlList[this.state.videoIndex].poster}
               currentTimeChanged={this.updateProgressBar}
               durationChanged={this.updateDuration}
               updatePlaybackStatus={this.videoEnded}
               bufferChanged={this.updateBufferBar} />
        <div className="video_controls" ref="videoControls">
          <VideoProgressBar handleProgressClick={this.seekVideo} totalDuration={this.state.totalDuration} percentPlayed={this.state.percentPlayed} percentBuffered={this.state.percentBuffered} videoIndex={this.state.videoIndex}/>
          <VideoPlaybackToggleButton handleTogglePlayback={this.togglePlayback} playing={this.state.playing} />
          <VideoVolumeButton muted={this.state.muted} volumeLevel={this.state.volumeLevel} toggleVolume={this.toggleMute} changeVolume={this.handleVolumeChange} />
          <VideoTimeIndicator  duration={this.state.duration} totalDuration={this.state.totalDuration} currentTime={this.state.currentTime} />
          <div className="rhs">
            <VideoFullScreenToggleButton onToggleFullscreen={this.toggleFullscreen} />
          </div>
        </div>
      </div>
    );
  }
});


function durationCompute(videolist) {
    var result = [];
    for (var i = 1; i <= videolist.length; i++) {
        result[i-1] = 0;
        for (var j = 0; j < i; j++) {
            result[i-1] += videolist[j].duration;
        }
       
    }
    return result;
}

function indexJudge(pos, video) {
    var result = {
        videoIndex: 0,
        timebefore: 0        
    };
    for (var i=0;i<video.length;i++) {
        if (Math.floor(pos / video[i]) == 0) {
            result.videoIndex = i;
            if (i == 0) {
                result.timebefore = 0;
            } else {
                result.timebefore= video[i - 1];
            }
            return result;
        }
    }
}

// var videoDuration = durationCompute(this.props.urlList);
// var totalDuration=videoDuration[this.props.urlList.length-1];
var timebefore=0;

export default VideoPlayer;