import React from 'react';
import {Link} from 'react-router';

//TODO:应该通过Ajax请求得到server中的所有视频信息,再通过react-router中的/:id来连接到视频详情
var videos=[
	{name:"video1",blocks:"5",videoId:"1001"},
	{name:"video2",blocks:"5",videoId:"1002"},
]


class videoList extends React.Component{
	render(){
		var HStyle={
	        textAlign:'center',
	    }
		return(	
			<div>
				<h2  style={HStyle}>Videolist</h2>
				<div className='StatusTable'>
					<div className="table-responsive">
						<table className="table table-bordered">
							<thead>
								<tr className="info"> 
									<th>VideoName</th>
									<th>how many blocks</th>
									<th>play</th>
								</tr>
							</thead>
							<tbody>
								{
									videos.map(
										(video,n)=>(
											<tr key={n}>
												<td className="text-center">{video.name}</td>
												<td className="text-center">{video.blocks}</td>
												<td className="text-center">
													<Link to={"/videos/video/"+video.videoId}>
													<span className="btn btn-default">Play</span>
													</Link>
												</td>
											</tr>
										)
									)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			
			
		)
	}
}

export default videoList;