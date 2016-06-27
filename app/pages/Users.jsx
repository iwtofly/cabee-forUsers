import React from 'react';
import MySwiper from '../component/swiper/swiper.jsx'
import MyTable from '../component/table_list/tableList.jsx'

import './users.css'

class Users extends React.Component {
   render() {
      return (
         <div className="div-style">
         	<h3 className="cabee_title">Cabee-Server</h3>
         	<MySwiper imgs={imgs} />
         	<MyTable files={files} />
         </div>
      );
   } 
}


var imgs=[
{"id":1,"thumb":"app/imgs/p1.jpg"},
{"id":2,"thumb":"app/imgs/p2.jpg"},
{"id":3,"thumb":"app/imgs/p3.jpg"},
{"id":4,"thumb":"app/imgs/p4.jpg"},
];

var files=[
{fileName:'pic1',fetchTimes:'0',hitTimes:'0',times:'not loaded',url:"../../media/kantai-1.jpg"},
{fileName:'pic2',fetchTimes:'0',hitTimes:'0',times:'not loaded',url:"../../media/kantai-2.jpg"},
{fileName:'pic3',fetchTimes:'0',hitTimes:'0',times:'not loaded',url:"../../media/kantai-3.jpg"},
{fileName:'pic4',fetchTimes:'0',hitTimes:'0',times:'not loaded',url:"../../media/kantai-4.jpg"},
{fileName:'pic5',fetchTimes:'0',hitTimes:'0',times:'not loaded',url:"../../media/kantai-5.jpg"},
{fileName:'pic6',fetchTimes:'0',hitTimes:'0',times:'not loaded',url:"../../media/mafia-1.jpg"},
]

export default Users;
