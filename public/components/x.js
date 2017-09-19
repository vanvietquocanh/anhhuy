import React from "react";

function Clock(props) {
	return    <h1>{props.date.toLocaleTimeString()}</h1>

}
export default class MainComponent extends React.Component{
	constructor(props){
		super(props)
			this.state = {date:new Date()};
	};
	
	componentDidMount()
	{
		this.timerID = setInterval
		(
			()=> this.tick(),
			1000
		);
	}
	
	componentWillUnMount()
	{
		clearInterval(this.timerID);
	}
	
	tick()
	{
		this.setState
		(
			{
				date:new Date()
			}
		)
	}
	render(){
		return(
			<div>
				<Clock date={this.state.date}/>
			</div>
		)
	};
};	
