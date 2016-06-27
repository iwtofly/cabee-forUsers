import React from 'react';

import './tableList.css'
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';

var TableRow=React.createClass({
	getInitialState:function(){
		return{
			showModal:false,
			loadTime:"Not loaded"
		};
	},
	close:function(){
		this.setState({
			showModal:false,
		});
	},
	open:function(e){
		var time = (new Date()).getTime();
		// var td=e.target.parentNode.parentNode.lastChild;
		// console.log(td);
		this.setState({
			showModal:true,
			url:this.props.file.url
		});
		time = (new Date()).getTime()-time;
		this.setState({
			loadTime:time
		})
	},
	render:function(){
		return(
		<tr>
			<td>
				<Button data-file={this.props.file.fileName} onClick={this.open}>{this.props.file.fileName}</Button>
			    <Modal ref="modaler" show={this.state.showModal} onHide={this.close}>
			    	<Modal.Header closeButton>
			    		<Modal.Title ref="modal_label">Loading Time:<span>{this.state.loadTime}</span>ms</Modal.Title>
			    	</Modal.Header>
			    	<Modal.Body ref="modal_body">
			    		<img className="modal_img" src={this.state.url}></img>
			    	</Modal.Body>
			    	<Modal.Footer>
			    		<Button onClick={this.close}>Close</Button>
			    	</Modal.Footer>
			    </Modal>
			</td>
			<td>{this.props.file.fetchTimes}</td>
			<td>{this.props.file.hitTimes}</td>
			<td>{this.state.loadTime}</td>
		</tr>
		)
	}
})

var MyTable=React.createClass({
	render:function(){
		var rows=[];
		this.props.files.forEach(function(item){
			rows.push(<TableRow file={item} key={item.fileName} /> )
		})
		return(
		<div className="my-table">
			<Table striped bordered condensed>
				<thead>
					<tr className="info">
						<th>File</th>
						<th>Direct Fetch Times</th>
						<th>Cache Hit Times</th>
						<th>Times(ms)</th>
					</tr>
				</thead>
					<tbody>{rows}</tbody>
			</Table>
		</div>
		)
	}
})

export default MyTable;