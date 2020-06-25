import React from "react";
import Switch from "react-switch";
import "../../variables/css/orderPopup.css"
import axios from "axios";

import { RegularCard, Button, Table, CustomInput, ItemGrid } from "components";

const textSwitch = {
display: "flex",
justifyContent: "center",
alignment: "center",
height: "100%",
fontSize: 14,
color: "#fff",
pasddingReight: 2,
}

class OrderPopup extends React.Component {

constructor(props){
	super(props);

	this.state = {
		checked: false
	}

	if(props.type === "sell")
		this.state = {
			checked: true
		}

	this.handleChange = this.handleChange.bind(this);
	this.handleOrder = this.handleOrder.bind(this);
}

handleChange(checked){
	this.setState({checked});

	let element = document.getElementsByClassName("navbar")[0];
	element.classList.toggle("red");
}

handleRadio = (e) => {
	let element = document.getElementsByClassName("buy")[0];
	if(element !== undefined)
	element.classList.toggle("buy");
	element = document.getElementsByClassName(e.target.value)[0];
	element.classList.toggle("buy");
	if(e.target.value === "marketb"){
	document.getElementsByClassName("priceb")[0].disabled = true;
	document.getElementsByClassName("triggerpriceb")[0].disabled = true;
	document.getElementsByClassName("targetpriceb")[0].disabled = true;
	}
	if(e.target.value === "limitb"){
	document.getElementsByClassName("priceb")[0].disabled = false;
	document.getElementsByClassName("triggerpriceb")[0].disabled = true;
	document.getElementsByClassName("targetpriceb")[0].disabled = true;
	}
	if(e.target.value === "slb"){
	document.getElementsByClassName("priceb")[0].disabled = true;
	document.getElementsByClassName("triggerpriceb")[0].disabled = false;
	document.getElementsByClassName("targetpriceb")[0].disabled = false;
	}
	if(e.target.value === "slmb"){
	document.getElementsByClassName("priceb")[0].disabled = true;
	document.getElementsByClassName("triggerpriceb")[0].disabled = false;
	document.getElementsByClassName("targetpriceb")[0].disabled = true;
	}
}

handleRadio2 = (e) => {
	let element = document.getElementsByClassName("buy")[1];
	if(element !== undefined)
	element.classList.toggle("buy");
	element = document.getElementsByClassName(e.target.value)[0];
	element.classList.toggle("buy");
}

handleRadio3 = (e) => {
	let element = document.getElementsByClassName("sell")[0];
	if(element !== undefined)
	element.classList.toggle("sell");
	element = document.getElementsByClassName(e.target.value)[0];
	element.classList.toggle("sell");
	if(e.target.value === "markets"){
	document.getElementsByClassName("prices")[0].disabled = true;
	document.getElementsByClassName("triggerprices")[0].disabled = true;
	document.getElementsByClassName("targetprices")[0].disabled = true;
	}
	if(e.target.value === "limits"){
	document.getElementsByClassName("prices")[0].disabled = false;
	document.getElementsByClassName("triggerprices")[0].disabled = true;
	document.getElementsByClassName("targetprices")[0].disabled = true;
	}
	if(e.target.value === "sls"){
	document.getElementsByClassName("prices")[0].disabled = true;
	document.getElementsByClassName("triggerprices")[0].disabled = false;
	document.getElementsByClassName("targetprices")[0].disabled = false;
	}
	if(e.target.value === "slms"){
	document.getElementsByClassName("prices")[0].disabled = true;
	document.getElementsByClassName("triggerprices")[0].disabled = false;
	document.getElementsByClassName("targetprices")[0].disabled = true;
	}
}

handleRadio4 = (e) => {
	let element = document.getElementsByClassName("sell")[1];
	if(element !== undefined)
	element.classList.toggle("sell");
	element = document.getElementsByClassName(e.target.value)[0];
	element.classList.toggle("sell");
}

handleOrder = () => {
	var proxy = ""
	if(process.env.NODE_ENV === "production")
		proxy = "https://crypto-manager-prod.herokuapp.com"

	if (!this.state.checked) {
		var userData = localStorage.getItem('user');
		const email = JSON.parse(userData)['email'];
		const aadharNo = JSON.parse(userData)['aadhar_card_no'];
		const panNo = JSON.parse(userData)['pan_card_no'];

		let data = new FormData();
		data.set('email', email);
		data.set('aadhar_card_no', aadharNo);
		data.set('pan_card_no', panNo);
		data.set('tick', this.props.tick);
		data.set('name', this.props.name);
		data.set('quantity', parseInt(document.getElementById("qtyb").value));
		data.set('price', parseInt(document.getElementById("pricebuy").value));
		data.set('triggerPrice', parseInt(document.getElementById("triggerbuy").value));
		data.set('targetPrice', parseInt(document.getElementById("targetbuy").value));
		data.set('percentChange', this.props.percentChange);

		axios.post(
			proxy + '/user/portfolio/add',
			data
		)
		.then(res => {
			// send notification
		})
		.catch(err => {
			console.log(err);
		})
	} else {
		var userData = localStorage.getItem('user');
		const email = JSON.parse(userData)['email'];
		const aadharNo = JSON.parse(userData)['aadhar_card_no'];
		const panNo = JSON.parse(userData)['pan_card_no'];

		let data = new FormData();
		data.set('email', email);
		data.set('aadhar_card_no', aadharNo);
		data.set('pan_card_no', panNo);
		data.set('tick', this.props.tick);
		data.set('quantity', parseInt(document.getElementById("qtys").value));
		data.set('price', parseInt(document.getElementById("pricesell").value));

		axios.post(
			proxy + '/user/portfolio/sell',
			data
		)
		.then(res => {
			// send notification
		})
		.catch(err => {
			console.log(err);
		})
	}

	this.props.callback();
}

	render() {
		var tick = this.props.tick;
	return (
		<div>
		<div className='popup_inner'>
			<div className="navbar" style={{backgroundColor: this.state.checked ? "#f44336" : "#5146b9"}}>
			<span className="type">{!this.state.checked ? 'Buy' : 'Sell'}</span>
			<span className="crypto">{tick}</span>
			<Switch
				className='react-switch'
				onChange={this.handleChange}
				checked={this.state.checked}
				handleDiameter = {20}
				offColor="#6666ff"
				onColor="#ff6966"
				width={75}

				checkedIcon={
				<div style={textSwitch}>Buy</div>
				}
				uncheckedIcon={
				<div style={textSwitch}>Sell</div>
				}
			/>
			</div>
			{!this.state.checked ?

			<form id="buyForm" >
				<span className="tag">Quantity :</span><input className="input-number buynumber" id="qtyb" type="number" min="1" step="1" defaultValue="1" required/>
				<div className="input-radio">
				<span className="marketb order">MARKET</span><input className="buyradio" type="radio" id="MARKETb" name="order" value="marketb" onClick={this.handleRadio} required/>
				{/* <label className="marketb order" for="MARKETb">MARKET</label> */}
				<span className="limitb order">LIMIT</span><input className="buyradio" type="radio" id="LIMITb" name="order" value="limitb" onClick={this.handleRadio}/>
				{/* <label className="limitb order" for="LIMITb">LIMIT</label> */}
				<span className="slb order">SL</span><input className="buyradio" type="radio" id="SLb" name="order" value="slb" onClick={this.handleRadio}/>
				{/* <label className="slb order" for="SLb">SL</label> */}
				<span className="slmb order">SL-M</span><input className="buyradio" type="radio" id="SL-Mb" name="order" value="slmb" onClick={this.handleRadio}/>
				{/* <label className="slmb order" for="SL-Mb">SL-M</label> */}
				</div>
				<div className="pricing">
				<span className=" tag">Price :</span><input className="input-number buynumber priceb" id="pricebuy" type="number" min="0" step="1" defaultValue="0" required/>
				<span className=" tag">Trigger Price :</span><input className="input-number buynumber triggerpriceb" id="triggerbuy" type="number" min="0" step="1" defaultValue="0" required/>
				<span className=" tag">Target Price :</span><input className="input-number buynumber targetpriceb" id="targetbuy" type="number" min="0" step="1" defaultValue="0" required/>
				</div>
				<div className="validity">
				<span className="dayb order">DAY</span><input className="buyradio" type="radio" id="DAYb" name="validity" value="dayb" onClick={this.handleRadio2} required/>
				{/* <label className="dayb order" for="DAYb">DAY</label> */}
				<span className="iocb order">IOC</span><input className="buyradio" type="radio" id="IOCb" name="validity" value="iocb" onClick={this.handleRadio2}/>
				{/* <label className="iocb order" for="IOCb">IOC</label> */}
				</div>
				<div className="footer">
				<Button onClick={this.handleOrder} type="submit" form="buyForm" id="buyBtn">Buy</Button>
				<Button onClick={this.props.callback} id="clsBtn">close</Button>
				</div>
			</form>
			:
			<form id="sellForm" >
				<span className=" tag">Quantity :</span><input className="input-number sellnumber" id="qtys"type="number" min="1" step="1" defaultValue="1" required/>
				<div className="input-radio">
				<span className="markets order">MARKET</span><input className="sellradio" type="radio" id="MARKETs" name="order" value="markets" onClick={this.handleRadio3} required/>
				{/* <label className="markets order" for="MARKETs">MARKET</label> */}
				<span className="limits order"></span>LIMIT<input className="sellradio" type="radio" id="LIMITs" name="order" value="limits" onClick={this.handleRadio3}/>
				{/* <label className="limits order" for="LIMITs">LIMIT</label> */}
				<span className="sls order">SL</span><input className="sellradio" type="radio" id="SLs" name="order" value="sls" onClick={this.handleRadio3}/>
				{/* <label className="sls order" for="SLs">SL</label> */}
				<span className="slms order">SL-M</span><input className="sellradio" type="radio" id="SL-Ms" name="order" value="slms" onClick={this.handleRadio3}/>
				{/* <label className="slms order" for="SL-Ms">SL-M</label> */}
				</div>
				<div className="pricing">
				<span className=" tag">Price :</span><input className="input-number sellnumber prices" id="pricesell" type="number" min="0" step="1" defaultValue="0" required/>
				<span className=" tag">Trigger Price :</span><input className="input-number sellnumber triggerprices" type="number" min="0" step="1" defaultValue="0" required/>
				<span className=" tag">Target Price :</span><input className="input-number sellnumber targetprices" type="number" min="0" step="1" defaultValue="0" required/>
				</div>
				<div className="validity">
				<span className="days order">DAY</span><input className="sellradio" type="radio" id="DAYs" name="validity" value="days" onClick={this.handleRadio4} required/>
				{/* <label className="days order" for="DAYs">DAY</label> */}
				<span className="iocs order">IOC</span><input className="sellradio" type="radio" id="IOCs" name="validity" value="iocs" onClick={this.handleRadio4}/>
				{/* <label className="iocs order" for="IOCs">IOC</label> */}
				</div>
				<div className="footer">
				<Button onClick={this.handleOrder} type="submit" form="sellForm" color="danger" id="sellBtn">Sell</Button>
				<Button onClick={this.props.callback} id="clsBtn" >close</Button>
				</div>

			</form>
			}
		</div>
		<div className="popup"></div>
		</div>
	);
	}
}

export default OrderPopup;
