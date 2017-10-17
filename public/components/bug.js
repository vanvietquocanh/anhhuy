import React,{ PropTypes } from "react";
import { connect } from "react-redux";
import Recaptcha from "react-recaptcha";
import axios from "axios";

//style
import "./css/Register.scss";

const responseFacebook = (response) => {
  console.log(response);
}

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
			status:"0",
			InvalidName:"",
			InvalidPass:"",
			InvalidEmail:"",
			InvalidPhone:"",
			InvalidRepass:"",
			FB:this.props.Facebook,
			Welcome:'',
			AddressErr:'',
			sitekey:"6Ld75iwUAAAAAGQ2ErfLAzyHtSu-jzVDE0js1AOw",
			sessionGG:"",
			imageClient:"",
			InvalidCaptcha:"",
		};
	}
	Email(e){
		this.setState({
			Email:e.target.value.trim(),
		});
	}
	SSSend(){
		var fx = (x)=>{
			this.setState({
				InvalidCaptcha:"Please session recaptcha"
			})
					x = true;
				if(this.state.Email.indexOf("@")==-1||this.state.Email.indexOf(".")==-1){
						x = false;
					}
				if(this.state.FullName.length<=4){
						x = false;
					}
				if(this.state.Password.length<=5){
						x = false;
					}
				if(this.state.PhoneNumber.length <10 || parseInt(this.state.PhoneNumber) === NaN){
						x = false;
					}
				if(this.state.RepeatPassword !== this.state.Password){
						x = false;
					}
				if(this.state.sessionGG === ''){
						this.setState({
							InvalidCaptcha:"Please session recaptcha"
						})
						x= false;
					}
				if(x===true){
					this.SubmitRegister();
				}else{
					
				}
			};
			fx(x);
	}
	SubmitRegister(){
		this.setState({
			AddressErr:''
		});
		const resetRecaptcha = () => {
		  recaptchaInstance.reset();  
		};
		let router = 'https://tripsfake.herokuapp.com/submit';
		let body =  {
			 	method: 'POST',
			  	headers: {
			    		'Accept': 'application/json',
			    		'Content-Type': 'application/json',
						  },
			  	body: JSON.stringify({
				    FullName:this.state.FullName,
				    PhoneNumber:this.state.PhoneNumber,
				    Password:this.state.Password,
				    RepeatPassword:this.state.RepeatPassword,
				    Email:this.state.Email,
				    imgClient:this.state.imageClient,
			 						})
					};
		fetch(router,body,(error, data)=>{
			})
     	.then(response => response.json())
    	.then(json => {
    		if(json){
    			if(json === 'Someone has used this address'){
					grecaptcha.reset();
    				this.setState({
    					AddressErr:json
    				})
    			}else if(json===this.state.FullName){
    				this.setState({
    					Welcome:this.state.FullName
    				})
	    		}else if(json==='Error ReCaptCha'){
	    			this.setState({
						InvalidCaptcha:'Error ReCaptCha'
					});
	    		}else{
	    			json.map((e,i)=>{
						grecaptcha.reset();
		    			if(e.param){
		    				switch (e.param) {
			    				case "Password":
			    					this.setState({
			    						InvalidPass:e.msg
			    					});
			    					break;
			    				case "FullName":
			    					this.setState({
			    						InvalidName:e.msg
			    					});
			    					break;
			    				case "PhoneNumber":
			    					this.setState({
			    						InvalidPhone:e.msg
			    					});
			    					break;
			    				case "Email":
			    					this.setState({
			    						InvalidEmail:e.msg
			    					});
			    					break;
			    				default:
			    					this.setState({
			    						InvalidRepass:e.msg
			    					});
			    					break;
			    			}
		    			}
		    		})
	    		}
    		}
  	    })
    		.catch(error=>{
    			this.setState({
    				AddressErr:err,
    			});
    		});
    };
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
		grecaptcha.reset();
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
		if(e.nativeEvent.keyCode===13||e.nativeEvent.key==='Enter'){
			this.SubmitRegister();
		}
	}
	componentDidUpdate(){
        if (this.state.status === "0") {
          	this.refs['input'+this.state.line].focus();
          	this.setState({
          		status:'1',
          	});
        };
    }
//Facebook login

//reCaptcha
	verifyCallback(response){
		if(response){
			var x = response;
			this.setState({
				sessionGG:response
			})
		}
	};

//
	render(){
			var recaptchaInstance;
			var SessionMail = '';
			var SessionRepeatPass = "";
			var SessionPass = "";
			var SessionName = '';
			var SessionPhone = "";
			var SessionForm = true;
		if(this.state.Welcome.length===0){
			if(this.state.Email.indexOf("@")==-1||this.state.Email.indexOf(".")==-1){
				if(this.state.Email.length===0){
					SessionMail = '';
				}else{
					SessionMail = 'Invalid Email';
					SessionForm = false;
				}
			}else{
					SessionMail = '';
			}


			if(this.state.FullName.length<=4){
				if(this.state.FullName.length===0){
					SessionName = "";
				}else{
					SessionName = "Invalid Name";
					SessionForm = false;
				}
			}else{
				SessionName = "";
			}


			if(this.state.Password.length<=5){
				if(this.state.Password.length===0){
					SessionPass = '';
				}else{
					SessionPass = 'Invalid Pass';
					SessionForm = false;
				}
			}else{
				SessionPass = '';
			}


			if(this.state.PhoneNumber.length <10 || parseInt(this.state.PhoneNumber) === NaN){
				if(this.state.PhoneNumber.length===0){
					SessionPhone = '';
				}else{
					SessionPhone = 'Invalid Phone Number';
					SessionForm = false;
				}
			}else {
				SessionPhone = '';
			}


			if(this.state.RepeatPassword !== this.state.Password){
				if(this.state.RepeatPassword.length===0){
					SessionRepeatPass = "";
				}else{
					SessionRepeatPass ="Invalid Repeat Password";
					SessionForm = false;
				}
			}else{
				SessionRepeatPass = "";
			}
		}
		let FormRegister = (<div className="Reg-form" style={{display:this.state.Form}}>
								<ul className="Reg-form-container">
									<h1 className="ErrAddress">{this.state.AddressErr}</h1>
									<label className="Reg-form-container-content">{SessionMail}{this.state.InvalidEmail}</label>
									<input className="Reg-form-container-content-in"  ref={ 'input' + this.state.line } name="Email" onChange={this.Email.bind(this)} value={this.state.Email} placeholder="Email" type="email"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionName}{this.state.InvalidName}</label>
									<input className="Reg-form-container-content-in" name="FullName" onChange={this.FullName.bind(this)} value={this.state.FullName} placeholder="Full Name" type="text"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionPhone}{this.state.InvalidPhone}</label>
									<input className="Reg-form-container-content-in" name="PhoneNumber" onChange={this.PhoneNumber.bind(this)} value={this.state.PhoneNumber} placeholder="Phone Number" type="text"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionPass}{this.state.InvalidPass}</label>
									<input className="Reg-form-container-content-in" name="Password" onChange={this.Password.bind(this)} value={this.state.Password} placeholder="Password" type="password"/>
								</ul>
								<ul className="Reg-form-container">
									<label className="Reg-form-container-content">{SessionRepeatPass}{this.state.InvalidRepass}</label>
									<input className="Reg-form-container-content-in" name="RepeatPassword" onChange={this.RepeatPassword.bind(this)} value={this.state.RepeatPassword} placeholder="Repeat Password" type="password"/>
								</ul>
								<ul className="Reg-form-container">
									<li className="loger">
										{this.state.FB}
									</li>
									<li className="recapt">
										<Recaptcha
											sitekey={this.state.sitekey}
											render="explicit" 
											theme="dark"
											verifyCallback={this.verifyCallback.bind(this)}
										/>{this.state.InvalidCaptcha}
									</li>
								</ul>
								<ul className="Reg-form-container last sub-reg">
									<input className="Reg-form-container-content-in sub-reg" onClick={this.SSSend.bind(this)} value="Register" type="submit"/>
								</ul>
							</div>);
		let Regis = (<a className="Reg" onClick={this.OnClickResgiter.bind(this)}>Register</a>);
		let ClientName = "";
		if(this.state.Welcome.length>0){
			FormRegister = '';
			Regis = '';
			ClientName = (<a className="Create">{this.state.success}</a>)
		}
		
		return(
			<section onKeyDown={this.Escape.bind(this)}>
				{Regis}
				{FormRegister}
				{ClientName}
			</section>
		)
	}
}
