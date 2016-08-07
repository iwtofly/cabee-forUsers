import React from 'react';

import VideoList from '../component/VideoList.jsx'

class video_ListPage extends React.Component {
   render() {
   	  var topStyle={
        height:'30px',
       }
      var HStyle={
        textAlign:'center',
      }
      return (
         <div>
            <div style={topStyle}></div>         	
            <h2  style={HStyle}>Videolist</h2>
            <VideoList/>
         </div>
      );
   } 
}

export default video_ListPage;	