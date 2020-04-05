import React from "react";
import Switch from "react-switch";

import { RegularCard, Button, Table, CustomInput, ItemGrid } from "components";

const textSwitch = {
  display: "flex",
  justifyContent: "center",
  alignment: "center",
  height: "100%",
  fontSize: 13,
  color: "#fff",
  pasddingReight: 2,
}

class Popup extends React.Component {

  constructor(){
    super();
    this.state = {
      checked: false,
    }
    this.handleChange = this.handleChange.bind(this)
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

    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <div className="navbar">
              <span className="type">{!this.state.checked ? 'Buy' : 'Sell'}</span>
              <span className="crypto">Currency Name</span>              
              <Switch
                className='react-switch'
                onChange={this.handleChange}
                checked={this.state.checked}
                handleDiameter = {20}
                offColor="#6666ff"
                onColor="#ff6966"
                
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
                <span className="tag">Quantaty :</span><input className="input-number buynumber" id="qtyb" type="number" min="1" step="1" defaultValue="1" required/>
                <div className="input-radio">
                  <input className="buyradio" type="radio" id="MARKETb" name="order" value="marketb" onClick={this.handleRadio} required/>
                  <label className="marketb order" for="MARKETb">MARKET</label>
                  <input className="buyradio" type="radio" id="LIMITb" name="order" value="limitb" onClick={this.handleRadio}/>
                  <label className="limitb order" for="LIMITb">LIMIT</label>
                  <input className="buyradio" type="radio" id="SLb" name="order" value="slb" onClick={this.handleRadio}/>
                  <label className="slb order" for="SLb">SL</label>
                  <input className="buyradio" type="radio" id="SL-Mb" name="order" value="slmb" onClick={this.handleRadio}/>
                  <label className="slmb order" for="SL-Mb">SL-M</label>
                </div>
                <div className="pricing">
                  <span className=" tag">Price :</span><input className="input-number buynumber priceb" type="number" min="0" step="1" defaultValue="0" required/>
                  <span className=" tag">Trigger Price :</span><input className="input-number buynumber triggerpriceb" type="number" min="0" step="1" defaultValue="0" required/>
                  <span className=" tag">Target Price :</span><input className="input-number buynumber targetpriceb" type="number" min="0" step="1" defaultValue="0" required/>
                </div>
                <div className="validity">
                  <input className="buyradio" type="radio" id="DAYb" name="validity" value="dayb" onClick={this.handleRadio2} required/>
                  <label className="dayb order" for="DAYb">DAY</label>
                  <input className="buyradio" type="radio" id="IOCb" name="validity" value="iocb" onClick={this.handleRadio2}/>
                  <label className="iocb order" for="IOCb">IOC</label>
                </div>
                <div className="footer">
                  <Button type="submit" form="buyForm" id="buyBtn">Buy</Button>
                  <Button onClick={this.props.closePopup} id="clsBtn">close</Button>
                </div>  
              </form>
            :
              <form id="sellForm" >
                <span className=" tag">Quantaty :</span><input className="input-number sellnumber" id="qtys"type="number" min="1" step="1" defaultValue="1" required/>
                <div className="input-radio">
                  <input className="sellradio" type="radio" id="MARKETs" name="order" value="markets" onClick={this.handleRadio3} required/>
                  <label className="markets order" for="MARKETs">MARKET</label>
                  <input className="sellradio" type="radio" id="LIMITs" name="order" value="limits" onClick={this.handleRadio3}/>
                  <label className="limits order" for="LIMITs">LIMIT</label>
                  <input className="sellradio" type="radio" id="SLs" name="order" value="sls" onClick={this.handleRadio3}/>
                  <label className="sls order" for="SLs">SL</label>
                  <input className="sellradio" type="radio" id="SL-Ms" name="order" value="slms" onClick={this.handleRadio3}/>
                  <label className="slms order" for="SL-Ms">SL-M</label>
                </div>
                <div className="pricing">
                  <span className=" tag">Price :</span><input className="input-number sellnumber prices" type="number" min="0" step="1" defaultValue="0" required/>
                  <span className=" tag">Trigger Price :</span><input className="input-number sellnumber triggerprices" type="number" min="0" step="1" defaultValue="0" required/>
                  <span className=" tag">Target Price :</span><input className="input-number sellnumber targetprices" type="number" min="0" step="1" defaultValue="0" required/>
                </div>
                <div className="validity">
                  <input className="sellradio" type="radio" id="DAYs" name="validity" value="days" onClick={this.handleRadio4} required/>
                  <label className="days order" for="DAYs">DAY</label>
                  <input className="sellradio" type="radio" id="IOCs" name="validity" value="iocs" onClick={this.handleRadio4}/>
                  <label className="iocs order" for="IOCs">IOC</label>
                </div>
                <div className="footer">
                  <Button type="submit" form="sellForm" color="danger">Sell</Button>
                  <Button onClick={this.props.closePopup} id="clsBtn" >close</Button>
                </div>
                
              </form>
            }
          </div>
        </div>
      );
    }
  }

export default Popup;