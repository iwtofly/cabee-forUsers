import React from 'react';
import { Link ,hashHistory } from 'react-router'

import './nav_bar.css'

import Button from 'react-bootstrap/lib/Button'


var NavBar=React.createClass({
	render:function(){
		return(
			<div className="nav_bar">
			<h3>演示系统</h3>
			<ul>
				<li>
					<Link to="/videos" activeStyle={{color:'red'}}>videoList</Link>
				</li>
				<li>
					<Link to="/cached" activeStyle={{color:'red'}}>video-detail</Link>
				</li>
				<li>
					<Link to="/users" activeStyle={{color:'red'}}>pictureList</Link>
				</li>
			</ul>
			</div>
		)
	}
})

export default NavBar;