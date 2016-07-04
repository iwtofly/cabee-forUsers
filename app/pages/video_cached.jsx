import React from 'react';

import VideoPlayer from '../component/video_player/video_player.jsx'
import StatusTable from '../component/video_player/StatusTable.js'


var urlList=[
  {text:"video1" ,duration:204 ,
  url:'http://220.167.105.121/170/2/11/acloud/151672/letv.v.yinyuetai.com/he.yinyuetai.com/uploads/videos/common/6609014F06AE1C8E99DE142502A2B157.flv?crypt=95aa7f2e98550&b=1314&nlh=3072&nlt=45&bf=6000&p2p=1&video_type=flv&termid=0&tss=no&geo=CN-23-323-1&platid=0&splatid=0&its=0&qos=5&fcheck=0&proxy=3062324601,2101603530,3683272595&uid=3063271287.rp&keyitem=GOw_33YJAAbXYE-cnQwpfLlv_b2zAkYctFVqe5bsXQpaGNn3T1-vhw..&ntm=1447949400&nkey=55c24f4c47dd315085c383e07750f67e&nkey2=3344c026a5c147651522c75bc51fb700&sc=0e90a16b75f7bc55&br=3136&vid=782863&aid=1559&area=KR&vst=0&ptp=mv&rd=yinyuetai.com?sc=0e90a16b75f7bc55&errc=0&gn=1065&buss=106551&cips=182.149.207.119&lersrc=MTI1Ljg5Ljc0LjE3MQ==&tag=yinyuetai&cuhost=letv.v.yinyuetai.com&cuid=151672&flw3x=0&sign=coopdown&fext=.flv&br=3136&ptp=mv&rd=yinyuetai.com',
  poster: 'http://thumbnails.thisisepic.com/b1ce00de-e687-4c1b-97ac-afa05a287327/large/frame_0005.png'},
  {text:"video2" ,duration:188 ,
  url:'http://videos.thisisepic.com/2b9c1bf3-e19b-4be5-9d36-246c5d3607d8/high.mp4',
  poster: 'video/MY_VIDEO_POSTER.jpg'}
];

// class Video_Cached extends React.Component {
var Video_Cached = React.createClass({
   render() {
      return (
         <div>
            Hello BYR!!!<br />
            <h2>video with cache</h2>
            <VideoPlayer urlList={urlList}/>
            <StatusTable/>
         </div>
      );
   } 
})

export default Video_Cached;	