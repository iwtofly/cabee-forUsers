import React from 'react';
import { hashHistory } from 'react-router'

import './nav_bar.css'

import Button from 'react-bootstrap/lib/Button'



var NavBar=React.createClass({
	getInitialState:function(){
		return{
			dataUrl1:"cache",
			dataUrl2:"normal",
			dataUrl3:"users"
		}
	},
	changeNavLi:function(){
		this.route(this.props.dataUrl)
	},
	route:function(index){
		this.props.transform();
		setTimeout( function(){
	      hashHistory.push( index );
	    }, 300);
	},
	render:function(){
		return(
			<div className="nav_bar">
			<h3>this is a Nav_Bar</h3>
			<ul>
				<li>
					<Button bsStyle="info" onClick={this.changeNavLi} dataUrl={this.state.dataUrl1}><a>video with cache</a></Button>
				</li>
				<li>
					<Button bsStyle="info" onClick={this.changeNavLi} dataUrl={this.state.dataUrl2}><a>video without cache</a></Button>				
				</li>
				<li>
					<Button bsStyle="info" onClick={this.changeNavLi} dataUrl={this.state.dataUrl3}><a>HOME</a></Button>
				</li>
			</ul>
			</div>
		)
	}
})

export default NavBar;