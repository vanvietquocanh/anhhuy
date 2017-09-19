import React from "react";



//style
import "./css/Register.scss";


export default class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			Form:'none',
			Email:"",
			FullName:"",
			PhoneNumber:"",
			Password:"",
			RepeatPassword:"",
			SessionForm:"",
			status:"0",
		};
	}
	Email(e){
		this.setState({
			Email:e.target.value.trim(),
		});
	}
	SubmitRegister(e){

	}
	FullName(e){
		this.setState({
			FullName:e.target.value
		});
	}
	PhoneNumber(e){
		this.setState({
			PhoneNumber:e.target.value.trim(),
		});
	}
	Password(e){
		this.setState({
			Password:e.target.value,
		});
	}
	RepeatPassword(e){
		this.setState({
			RepeatPassword:e.target.value,
		});
	}
	OnClickResgiter(){
		this.setState({
			Form:'block',
			status:'0',
		});
	}
	NoneRegister(){
		this.setState({
			Form:'none',
        	status:'1',
		});
	}
	Escape(e){
		if(e.nativeEvent.keyCode===27||e.nativeEvent.key==='Escape'){
			this.NoneRegister();
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		return true;
	}
	componentWillUpdate(nextProps, nextState) {
		
  	} 
	componentDidUpdate(){
        if (this.state.status === "0") {
          	this.refs['input'+this.state.line].focus();
          	this.setState({
          		status:'1',
          	});
        };
    }
	render(){
		let SessionMail = '';
		if(this.state.Email.indexOf("@")==-1||this.state.Email.indexOf(".")==-1){
			SessionMail = 'Invalid Email';
		}else{
				SessionMail = '';
		}
		let SessionName = '';
		if(this.state.FullName.length<=5){
			SessionName = "Invalid Name";
		}else{
			SessionName = "";
		}
		let SessionPass = "";
		if(this.state.Password.length<=5){
			SessionPass = 'Invalid Pass';
		}else{
			SessionPass = '';
		}
		let SessionPhone = "";
		if(this.state.PhoneNumber.length <=10 || parseInt(this.state.PhoneNumber) === NaN){
			SessionPhone = 'Invalid Phone Number';
		}else{
			SessionPhone = '';
		}
		let SessionRepeatPass = "";
		if(this.state.RepeatPassword !== this.state.Password){
			SessionRepeatPass ="Invalid Repeat Password"
		}else{
			SessionRepeatPass = "";
		}
		let FormRegister = (<form className="Reg-form" style={{display:this.state.Form}}>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionMail}</label>
									<input className="Reg-form-container-content-in"  ref={ 'input' + this.state.line } name="Email" onChange={this.Email.bind(this)} value={this.state.Email} placeholder="Email" type="email"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionName}</label>
									<input className="Reg-form-container-content-in" name="FullName" onChange={this.FullName.bind(this)} value={this.state.FullName} placeholder="Full Name" type="text"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionPhone}</label>
									<input className="Reg-form-container-content-in" name="PhoneNumber" onChange={this.PhoneNumber.bind(this)} value={this.state.PhoneNumber} placeholder="Phone Number" type="text"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionPass}</label>
									<input className="Reg-form-container-content-in" name="Password" onChange={this.Password.bind(this)} value={this.state.Password} placeholder="Password" type="password"/>
								</ul>
								<ul className="Reg-form-container last">
									<label className="Reg-form-container-content">{SessionRepeatPass}</label>
									<input className="Reg-form-container-content-in" name="RepeatPassword" onChange={this.RepeatPassword.bind(this)} value={this.state.RepeatPassword} placeholder="Repeat Password" type="password"/>
								</ul>
								<ul className="Reg-form-container last sub-reg">
									<input className="Reg-form-container-content-in sub-reg" value="Register" type="submit"/>
								</ul>
							</form>);
		return(
			<section onKeyDown={this.Escape.bind(this)}>
			<a className="Reg" onClick={this.OnClickResgiter.bind(this)}>Register</a>
			{FormRegister}
			</section>
		)
	}
}