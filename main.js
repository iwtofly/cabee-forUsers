import React from 'react';
import ReactDOM from 'react-dom';
import { Router ,Route ,IndexRoute ,hashHistory } from 'react-router';

import NavHeader from './app/component/nav_header/nav_header.jsx'
import NavBar from './app/component/nav_bar/nav_bar.jsx'

import Users from './app/pages/Users.jsx';
import App from './app/pages/App.jsx';
import NoMatch from './app/pages/NoMatch.jsx';
import video_ListPage from './app/pages/video_ListPage.jsx';
import Video_Cached from './app/pages/video_cached.jsx'


import './public/main.css'

var mainStyle={
	backgroundColor:'#ccc',
};

var MainApp = React.createClass({
	getInitialState:function(){
		return{
			nav_show:false
		}
	},
	transform:function(){
		this.setState({
			nav_show:!this.state.nav_show
		})
	},
	render:function(){
		var page_class=this.state.nav_show ? 's-page':'h-page';
		return(
			<div>
				<NavBar transform={ this.transform }/>
				<div id="cur-page" className={page_class}>
					<NavHeader transform={this.transform}/>    {/*留作用于显示侧面Nav_Bar*/}
					{this.props.children}
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<Router history={hashHistory} >
		<Route path="/" component={MainApp}>
			<IndexRoute component={App}/>
	    	<Route path="/users" component={Users}/>
	    	<Route path="/videos" component={video_ListPage}>
	    		<IndexRoute component={video_ListPage}/>
	    		{/*<Route path="/video/:videoId" component={Video_Cached} />*/}
	    		<Route path="a" component={Video_Cached} />
	    	</Route>
	    	<Route path="/cached" component={Video_Cached} />
	    	<Route path="*" component={NoMatch}/>
	    </Route>
    </Router>
	, document.getElementById('app')
);