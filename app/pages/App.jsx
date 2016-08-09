import React from 'react';
import './users.css'

class App extends React.Component {
   render() {
      return (
         <div className="content">
	        <div className="topDiv"><img src="app/imgs/bupt.png" className="topImg"/></div>
	        <div className="article">
	            <h2 className="fnlTittle">FNL</h2><h5 className="labTittle">——未来网络实验室</h5>
	            <div>
	            	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未来网络理论与应用实验室（Future Network Laboratory，FNL）是北京邮电大学信息与通信工程学院（以下简称信通院）下属的一个学术团队，专门从事电信网、互联网等网络技术领域的创新研究。实验室于2008年4月正式成立，现有教师13名，其中院士1名，教授4名，副教授6名，讲师2名，博士后1名，建立起了包括博士生和硕士生在内约70人的研究队伍、学历层次合理</p>
	            </div>
            </div>
         </div>
      );
   } 
}

export default App;	