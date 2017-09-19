import React from "react";


export default class AnotherComponent extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			backgroundColor: "blue",
			color: "red",
			isToggleOn: true
		};
	}
	clientClick()
	{
		this.setState(prevState =>({
			isToggleOn: !prevState.isToggleOn
		}));
	}
	taggleColor(){
		if(this.state.color === "red"){
			this.setState({
				color: "yellow"
			});
		}else{
			this.setState({
				color: "red"
			});
		}
		if(this.state.backgroundColor === "blue"){
			this.setState({
				backgroundColor: "green"
			});
		}else{
			this.setState({
				backgroundColor: "blue"
			});
		}
	}
	changeColor(event){
		this.setState({
			color: event.target.value
		});
		this.setState({
			backgroundColor: event.target.value
		});
	}
	render(){
		return(
			<div style={{backgroundColor:this.state.backgroundColor}}>
				<button onClick={()=>this.clientClick()}>{this.state.isToggleOn ? "On":"OFF"}</button>
				<h1 onClick={this.taggleColor.bind(this)} style={{color:this.state.color, backgroundColor:this.state.backgroundColor}}>{this.state.color}</h1>
				<input style={{color:"black"}} value={this.state.color} onChange={this.changeColor.bind(this)}/>
			</div>
		)
	}
}
