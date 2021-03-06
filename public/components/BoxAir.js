import React from "react";
import API from 'qpx-express';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import TwitterLogin from 'react-twitter-auth';
import 'react-datepicker/dist/react-datepicker.css';
import "./css/BoxAir.scss";



export default class BoxAir extends React.Component{
	constructor(props){
		super(props);
		this.state={
			STTLog:this.props.STTLogin,
			Scroll:"0",
			width:"100%",
			title:'WHERE WOULD YOU LIKE TO GO?',
			DateIn: moment(),
			Origin: '',
			ClientEmail:'',
			ClientName:'',
			formSearch:'block',
			formShowData:'none',
			BTDP:"none",
			Destination: '',
			displayAdults: 'none',
			OpAdults: '0',
			OpBud:'0',
			displayBud:'none',
			dp:'none',
			valueAdults:"",
			valueBudget:"",
			Kind:'',
			hr:'0',
			Adults : 	
	 			[
	 				'2+1 WITH BEDROOM + 2 CHILD',
	 				'1+1 WITH BEDROOM + 1 CHILD',
	 				'2+1 WITH BEDROOM + FULL',
	 				'FULL SERVICES 15 DAYS'
	 			],
	 		Budget :	
 			[
 				'$200',
 				'$500',
 				'$1000',
 				'$2000',
 				'$3000',
 				'$4000'
 			],
 			Err:'',
 			TripsOp:[],
 			AirLine:[],
    };
    	this.CheckIn = this.CheckIn.bind(this);
	}
//Call API
	GetAPi(){
		this.setState({
			formSearch:'none',
			formShowData:'block',
			BTDP:"block",
		})
		var month=this.state.DateIn._d.getMonth()+1;
		var DateOrigin = this.state.DateIn._d.getFullYear()+'-'+month+'-'+this.state.DateIn._d.getDate();
		var Adult,Children,MaxPrice;
		switch (this.state.valueAdults) {
			case '2+1 WITH BEDROOM + 2 CHILD':
				Adult = 3;
				Children = 2;
				break;
			case '2+1 WITH BEDROOM + FULL':
				Adult = 3;
				Children = 0;
				break;
			case '1+1 WITH BEDROOM + 1 CHILD':
				Adult = 2;
				Children = 1;
				break;
			default:
				Adult = 4;
				Children = 0;
				break;
		}
		var EG = 'USD';
		MaxPrice = EG.concat(this.state.valueBudget.substr(1));
		const apiKey = 'AIzaSyDD5-yAAzr3HMV9ju-my78popee9Ru4Tl0';
		var qpx = new API(apiKey);
		var body = {
					  request: {
					    slice: [
					      {
					        origin: this.state.Origin,
					        destination:this.state.Destination,
					        date:DateOrigin,
					      }
					    ],
					    passengers: {
					       adultCount:Adult,
					        childCount:Children
					    },
					    	maxPrice:MaxPrice,
					    	refundable: false
					  	}
					}
		var Trips = (x)=>{
				if(x.data.carrier===undefined){
					console.log('Đéo có')
					this.setState({
						Err:'Không tìm thấy chuyến bay!',
						formSearch:'block',
						formShowData:'none',
					})
				}
				if(x){
					this.setState({
						Err:'',
						hr:'0%',
						TripsOp:[],
					})
					var TripO = x.tripOption;
					var searchName = this.state.AirLine;
//
					x.data.carrier.map((stt,i)=>{
						let aln =   {
										CodeAir:x.data.carrier[i].code,
										AirLineName:x.data.carrier[i].name,
									}
						searchName.push(aln)
					});
//
					TripO.map((e,i)=>{
								var codeAir;
							searchName.map((b,c)=>
								{
									if(TripO[i].slice[0].segment[0].flight.carrier===b.CodeAir) codeAir=b.AirLineName;
								}
							)
							var sendprice = parseInt((TripO[i].saleTotal).slice(3));//VND = 3
							var price = (x)=>{
									const pri = x;
									let z,g;
									if(x<9999999){

										if(pri%1000000>499999){
											z = Math.round(pri/1000000)-1
										}else{
											z = Math.round(pri/1000000)
										}
										   if(pri%1000000===0){
													g = "000";
												}else{
													g = (pri%1000000)/1000;
												} 
									    return z+'.'+g+".000";
									}else{
										if(pri%1000000>499999){
											z = Math.round(pri/1000000)-1;
										}else{
											z = Math.round(pri/1000000);
										}
											if(pri%1000000===0){
												g = "000";
											}else{
												g = (pri%1000000)/1000;
											} 
										return z+'.'+g+".000";
									}
							}
								let air = {
											AirId:TripO[i].id,
											AirCode:TripO[i].slice[0].segment[0].leg[0].aircraft,
											Prince:price(sendprice),
											ArriValTime:TripO[i].slice[0].segment[0].leg[0].arrivalTime,
											DepartureTime:TripO[i].slice[0].segment[0].leg[0].departureTime,
											origin:TripO[i].slice[0].segment[0].leg[0].origin,
											dest:TripO[i].slice[0].segment[0].leg[0].destination,
											Cabin:TripO[i].slice[0].segment[0].cabin,
											MileAge:TripO[i].slice[0].segment[0].leg[0].mileage,
											Time:TripO[i].slice[0].segment[0].duration,
											FlightNumber:TripO[i].slice[0].segment[0].flight.number,
											Carrier:codeAir
										}
						this.state.TripsOp.push(air);
						setTimeout(()=>{
							this.setState({
								hr:'100%',
								Err:'',
							})
						}, 1000);
					})
				}else {
					this.setState({
						Err:'Error!!!',
						formSearch:'block',
						formShowData:'none',
					})
				}
		};
		qpx.getInfo(body,function(error, data){
			let x = data.trips;
			let er = error;
			if(data) Trips(x);
			});

	}
	DisplayInAdults()
	{
			this.setState
			(
				{
					displayAdults:'block',
					OpAdults:'1'
				}	
			)
	}
	DisplayOutAdults()
	{
			this.setState
			(
				{
					OpAdults:'0',
				}	
			)
			setTimeout(()=>{
				this.setState
				(
					{
						displayAdults:'none',
					}	
				)
			},200);
	}
//buget
	DisplayInBudget()
	{
			this.setState
			(
				{
					displayBud:'block',
					OpBud:'1'
				}	
			)
	}
	DisplayOutBudget()
	{
			this.setState
			(
				{
					OpBud:'0',

				}	
			)
			setTimeout(()=>{
				this.setState
				(
					{
						displayBud:'none',
					}	
				)
			},200);
	}
// prevent Key Board
	PreventKeyBoard(e){
		e.preventDefault();
	}
// set value 
	SetAdults(x)
	{
		this.setState
		(
			{
				valueAdults:x.target.innerHTML
			}
		)
	}
	SetBudget(z)
	{
		this.setState
		(
			{
				valueBudget:z.target.innerHTML
			}
		)
	}
// datepicker
	CheckIn(date) {
    	this.setState({
      		DateIn: date
    	});
  	}
// Swap Trips
	SwapOrigin(x)
	{
		this.setState
		(
			{
				Origin:x.target.value.trim().toUpperCase()
			}
		)
	}
	SwapDestination(x){
		this.setState
		(
			{
				Destination:x.target.value.trim().toUpperCase()
			}
		)
	}
//
	None(){
		this.setState({
			formSearch:"block",
			formShowData:"none",
			BTDP:"none",
			Origin: '',
			Destination: '',
			valueAdults:"",
			valueBudget:"",
		})
	}
	Booking(e){
		console.log('submit',e);
		e.preventDefault();
	}
//
	Close(){
		this.setState
		(
			{
				formSearch:'block',
				formShowData:'none',
			}
		)
	}
//facebook
	FBgetStatus(res){
		if(res.status !== 'unknown'||res.status !== 'not_authorized'){
			this.setState({
				ClientName:res.name,
				ClientEmail:res.email,
			})
		}else{
			this.setState({
				ClientName:'',
				ClientEmail:'',
			})
		}
	}
//google
	responseGoogle(res){
		if(res.profileObj){
			this.setState({
				ClientName:res.profileObj.name,
				ClientEmail:res.profileObj.email
			})
		}
	}
	resERR(res){
		if(res){
			this.setState({
				ClientName:'',
				ClientEmail:''
			})
		}
	}
//
	onFailed(res){
		console.log(res)
	}
	onSuccess(res){
		console.log(res)
	}
//
	render(){
		var btLoginTwitter;
		var btLoginGG = (<GoogleLogin
							clientId = "1084277940261-dd4n0clo7hb83i2ksk2hrtpvv1pqksh0.apps.googleusercontent.com"
						    buttonText = "Google"
						    redirectUri="https://newtripsfake.herokuapp.com/"
						    scope="https://www.googleapis.com/auth/userinfo.email"
						    onSuccess = { this.responseGoogle.bind(this) }
						    onFailure = { this.resERR.bind(this) }
						/>);
		var btLogFB = (<FacebookLogin
							appId="114278719301911"
						    autoLoad={false}
						    reAuthenticate={true}
						    fields="name,email,picture"
						    callback={this.FBgetStatus.bind(this)}
						/>);
		var buttonBook;
		var icon;
		if(this.state.ClientName.length>=1){
			icon = (<i className="fa fa-search"></i>);
			buttonBook = (<button onClick={this.GetAPi.bind(this)} className="app-block-sm" type="submit" >BOOK NOW</button>)
			btLogFB = '';
			btLoginGG = '';
		}else{
			buttonBook = '';
			icon = '';
			btLogFB = (<FacebookLogin
							appId="114278719301911"
						    autoLoad={false}
						    reAuthenticate={true}
						    fields="name,email,picture"
						    callback={this.FBgetStatus.bind(this)}
						/>);
			btLoginGG = (<GoogleLogin
							clientId = "1084277940261-dd4n0clo7hb83i2ksk2hrtpvv1pqksh0.apps.googleusercontent.com"
						    buttonText = "Google"
						    redirectUri="https://newtripsfake.herokuapp.com/"
						    scope="https://www.googleapis.com/auth/userinfo.email"
						    onSuccess = { this.responseGoogle.bind(this) }
						    onFailure = { this.resERR.bind(this) }
						/>);
		}
		let Booking='';
		let ListAir='';
		if(this.state.TripsOp.length>=1){
			ListAir = this.state.TripsOp.map((x,i)=><label key={i} className="app-ajax-label">
														<div className="app-ajax-label-container">
															<div className="app-ajax-label-stt">
																{i+1}
															</div>
															<div className="app-ajax-label-content">
																<ul className="app-ajax-label-list">Giá Vé: {x.Prince}VND</ul>
																<ul className="app-ajax-label-list order">Hãng:{x.Carrier}</ul>
																<ul className="app-ajax-label-list">Cabin: {x.Cabin}</ul>
																<ul className="app-ajax-label-list">Quảngđường: {x.MileAge}km</ul>
																<ul className="app-ajax-label-list">Thời Gian: {x.Time}minutes</ul>
															</div>
															<div className="app-ajax-label-content app-ajax-label-hidden">
																<ul className="app-ajax-label-list app-ajax-label-list-sub">Xuất Phát: {x.origin}</ul>
																<ul className="app-ajax-label-list app-ajax-label-list-sub">Đến: {x.dest}</ul>
																<ul className="app-ajax-label-list app-ajax-label-list-sub order">{x.DepartureTime} -> {x.ArriValTime}</ul>
																<ul className="app-ajax-label-list app-ajax-label-list-sub">Chuyến Số: {x.FlightNumber}</ul>
																<ul className="app-ajax-label-list app-ajax-label-list-sub">Mã MB: {x.AirCode}</ul>
															</div>
														</div>
														<input className="app-ajax-picker" name="Trip" type="radio" key={i.toString()} value={x.AirId}/>
													</label>);
			Booking = (<ul>
							<button style={{display:this.state.BTDP}} type="reset" onClick={this.None.bind(this)} value="Research" className="app-ajax-sub app-ajax-search">Search</button>
							<button style={{display:this.state.BTDP}} onSubmit={this.Booking.bind(this)} type="submit" value="Booking" className="app-ajax-sub">Booking</button>
					   </ul>);
		}
	return(
			<div className="app">
				<h1></h1>
				<div className="app-content" style={{display:this.state.formSearch}}>
					<h1 className="app-title" style={{width:this.state.width}}>{this.state.title}</h1>
					<ul className="app-block">
						<input className="app-block-ip" type="text" value={this.state.Origin} onChange={this.SwapOrigin.bind(this)} placeholder="Code Origin: Country, City,Airport,..." autoComplete="off" name="origin"/>
					</ul>
					<ul className="app-block">
						<input className="app-block-ip" type="text" value={this.state.Destination} onChange={this.SwapDestination.bind(this)} placeholder="Code Destination: Country, City,Airport,..." autoComplete="off" name="Destination"/>
					</ul>
					<ul className="app-block">
						<DatePicker className="app-block-ip ipdate ip-In" autoComplete="off" value={this.state.DateIn} dateFormat="YYYY/MM/DD" selected={this.state.DateIn} onChange={this.CheckIn}/><i className="fa fa-calendar" aria-hidden="true"></i>
					</ul>
					<ul className="app-block">
						<input className="app-block-ip  AdultsBox" value={this.state.valueAdults} type="text" onFocus={this.PreventKeyBoard.bind(this)} onFocus={this.DisplayInAdults.bind(this)} onBlur={this.DisplayOutAdults.bind(this)} autoComplete="off" name="adults" placeholder="Adults"/><i className="fa fa-chevron-down" aria-hidden="true"></i>
						<div className="app-block-sub" style={{display:this.state.displayAdults}}>
							<ul className="app-block-sub-content">
								{this.state.Adults.map((x,i)=><label onClick={this.SetAdults.bind(this)} key={i.toString()+"Adults"} value={x} className="app-block-sub-content-sl">{x}</label>)}
							</ul>
						</div>
					</ul>
					<ul className="app-block">
						<input className="app-block-ip" value={this.state.valueBudget} type="text" onFocus={this.PreventKeyBoard.bind(this)} onClick={this.DisplayInBudget.bind(this)} onBlur={this.DisplayOutBudget.bind(this)} autoComplete="off" name="budget" placeholder="Budget"/><i className="fa fa-chevron-down" aria-hidden="true"></i>
						<div className="app-block-sub BudgetBox" style={{display:this.state.displayBud}}>
							<ul className="app-block-sub-content">
								{this.state.Budget.map((y,b)=><label onClick={this.SetBudget.bind(this)} key={b.toString()+"Budget"} value={y} className="app-block-sub-content-sl">{y}</label>)}
							</ul>
						</div>
					</ul>
					<ul className="app-block button">
						{icon}{buttonBook}
						{btLogFB}
						{btLoginGG}
						{btLoginTwitter}
					</ul>
				</div>
				<h1 className="app-Err">{this.state.Err}</h1><hr className="app-hr" style={{width:this.state.hr}}/>
				<form action="/submit" method="post" acceptCharset="utf-8" className="app-ajax" style={{display:this.state.formShowData}}>
					<input className="None" name='email' value={this.state.ClientEmail}/>
					<input className="None" name='name' value={this.state.ClientName}/>
					<section className="app-ajax-st">
						{ListAir}
					</section>
					{Booking}
				</form>
			</div>
		)
	}
}
