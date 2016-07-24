import React from 'react';
import pubsub from 'pubsub-js';



var StatusTable=React.createClass({
	getInitialState: function() {
	return {
		videoIndex:0,
		info:[]
		}
	},
	componentWillMount: function() {
	this.pubsub_token1 = pubsub.subscribe('index', function(topic, videoIndex) {
	  // update my selection when there is a message
	  this.setState({ videoIndex: videoIndex });
	}.bind(this));

	this.pubsub_token2 = pubsub.subscribe('status', function(topic, pubInfo) {
	  // update my selection when there is a message
	  this.setState({ info:pubInfo });
	}.bind(this));


	console.log("videoIndex:  "+this.state.videoIndex)
	
	},
	componentWillUnmount: function() {
	// React removed me from the DOM, I have to unsubscribe from the pubsub using my token
	pubsub.unsubscribe(this.pubsub_token1);
	pubsub.unsubscribe(this.pubsub_token2);

	},
	getIndex:function(){
		return(this.state.videoIndex);
		
	},
	render: function() {
		var index=this.getIndex()
		var List=this.state.info.map((info,n)=>{
			return(
				<tr key={n}>
					<td>{n+1}</td>
					<td>{Math.floor(this.state.info[n].buf*10)/10}%</td>
				</tr>
			)
		})
		return (
			<div className='StatusTable'>
				<div className="table-responsive">
					<table className="table table-bordered">
						<thead>
							<tr className="info"> 
								<th>FileIndex</th>
								<th>buffer-progress</th>
							</tr>
						</thead>
						<tbody>
							{List}
						</tbody>
					</table>
				</div>
			</div>

		)
	}
})

export default StatusTable;

// <h5>url:{this.state.info[0].url}</h5>
// 
// 
// {List}
				// <p>There are {this.state.info.length} Videos intotal </p>