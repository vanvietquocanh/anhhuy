import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { LoginActions } from "../actions";

import "./css/Login.scss";

class Login extends React.Component{
	constructor(props){
		super(props);
	}
	click(){
		this.props.testclick();
	}
	render(){
		console.log(this.props)
		return (
				<div className="log">
					{this.props.sodem}
					<button onclick={this.click.bind(this)}></button>
				</div>
				)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		testclick:()=>dispatch(LoginActions('add'))
	}
}

const mapStateToProps = (state) => {
	return state;
}

const DefaultApp = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

export default DefaultApp;