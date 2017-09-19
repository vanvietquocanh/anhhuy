import React from "react";
import API from 'qpx-express';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import 'react-datepicker/dist/react-datepicker.css';
import "./css/BoxAir.scss";


export default class BoxAir extends React.Component{
	constructor(props){
		super(props);
		this.state={
			Scroll:"0",
			width:"100%",
			title:'WHERE WOULD YOU LIKE TO GO?',
			DateIn: moment(),
			Origin: '',
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
											//Deadline:TripO[i].pricing,
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
	// componentWillMount(){
	// 	FB.getLoginStatus(function(response) {
	// 	    statusChangeCallback(response);
	// 	    console.log(response);
	// 	});
	// }
	// componentWillReceiveProps(nextProps){
	// 		console.log(nextProps,"1")
	// }
	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log(nextProps,nextState,"2")
	// 	return true;
	// }

	// componentDidMount()
	// {
	// 	console.log(this,"3");
	// }

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
//
	render(){
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
														<input className="app-ajax-picker" name="Trip" type="radio" key={i.toString()} value={x}/>
													</label>);
			Booking = (<ul>
							<button style={{display:this.state.BTDP}} type="reset" onClick={this.None.bind(this)} value="Research" className="app-ajax-sub app-ajax-search">Search</button>
							<button style={{display:this.state.BTDP}} type="submit" value="Booking" className="app-ajax-sub"></button>
					   </ul>);
		}
	return(
			<div className="app">
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
					<ul className="app-block">
						<i className="fa fa-search"></i><button onClick={this.GetAPi.bind(this)} className="app-block-sm" type="submit">BOOK NOW</button>
					</ul>
				</div>
				<h1 className="app-Err">{this.state.Err}</h1><hr className="app-hr" style={{width:this.state.hr}}/>
				<form className="app-ajax" style={{display:this.state.formShowData}}>
					<section className="app-ajax-st">
						{ListAir}
					</section>
					{Booking}
				</form>
			</div>
		)
	}
}
