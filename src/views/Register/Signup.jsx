import React, { Component } from "react";
import '../../variables/css/bootstrap.css';
import '../../variables/css/registerStyle.css'
import axios from 'axios';
import {SnackbarContent} from "components"

export default class SignUp extends Component {

	constructor(props) {
        super(props);

        this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			aadharCardNo: '',
			panCardNo: '',
			mobileNo: '',
			userDetailsSubmitted: false,
			userCheckSubmitted: false,
			userDetailsPassed: false,
			accountCreated: false,
			errorOccured: false,
			userAlreadyLoggedIn: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.userLoggedIn();
	}
	
	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

	handleSubmit(e) {
		e.preventDefault();

		if(this.state.userDetailsPassed) {
			this.setState({ userCheckSubmitted: true });
			const { firstName, lastName, email, password, aadharCardNo, panCardNo, mobileNo } = this.state;

			// TODO: Add rigid checks
			if (aadharCardNo && panCardNo && mobileNo) {
				// Register new user
				let userFormData = new FormData()
				userFormData.set('email', email);
				userFormData.set('password', password);
				userFormData.set('first_name', firstName);
				userFormData.set('last_name', lastName);
				userFormData.set('aadhar_card_no', aadharCardNo);
				userFormData.set('pan_card_no', panCardNo);
				userFormData.set('mobile_no', mobileNo);
				userFormData.set('is_admin', 0);
				
				let ctx = this;
				var proxy = ""
				if(process.env.NODE_ENV === "production")
					proxy = "https://crypto-manager-prod.herokuapp.com"
				
				axios.post(
					proxy + '/user/account/create',
					userFormData
				)
				.then(res => {
					console.log(res);
					ctx.setState({accountCreated: true, errorOccured: false})
				})
				.catch(err => {
					console.log(err);
					ctx.setState({errorOccured: true, accountCreated: false})
				})
			}

		} else {
			this.setState({ userDetailsSubmitted: true });
			const { firstName, lastName, email, password, aadharCardNo, panCardNo, mobileNo } = this.state;
			
			// TODO: Add rigid checks
			if (email && password) {
				this.setState({userDetailsPassed: true})
			}
		}
	}

	userLoggedIn() {
        // TODO: Handle token value of undefined
        try {
            var userData = localStorage.getItem('user');
            const userToken = JSON.parse(userData)['token'];
            let data = new FormData();
            data.set('Authorization', userToken);

            var proxy = ""
            if(process.env.NODE_ENV === "production")
                proxy = "https://crypto-manager-prod.herokuapp.com"
            
            axios.post(
                proxy + '/user/details',
                data
            )
            .then(res => {
                if(res['data']['statusCode']) {
                    window.open("/dashboard","_self");
                }
            })
            .catch(err => {
				// pass
				this.setState({userAlreadyLoggedIn: false});
            })
        } catch (error) {
			// User data doesn't exists
			this.setState({userAlreadyLoggedIn: false});
        }
    }
	
    render() {
		const { firstName, lastName, email, password, aadharCardNo, panCardNo, mobileNo, userDetailsSubmitted, userCheckSubmitted, userDetailsPassed, accountCreated, errorOccured, userAlreadyLoggedIn } = this.state;
		return (
			<div>
				{
					userAlreadyLoggedIn ?
					"" :
					<div className="local-bootstrap">
						<div className="registerActivity">
							<div className="auth-wrapper">
								<div className="auth-inner">
									<form name="form" onSubmit={this.handleSubmit}>
										<h3>Sign Up</h3>

										{
											userDetailsPassed ? 
											<div className={'form-group' + (userCheckSubmitted && !aadharCardNo ? ' has-error' : '')}>
												<label>Aadhar Card No</label>
												<input type="text" className="form-control" placeholder="Aadhar Number" name="aadharCardNo" value={aadharCardNo} onChange={this.handleChange} />
											</div> :
											<div className={'form-group' + (userDetailsSubmitted && !firstName ? ' has-error' : '')}>
												<label>First name</label>
												<input type="text" className="form-control" placeholder="First name" name="firstName" value={firstName} onChange={this.handleChange} />
											</div>							
										}

										{
											userDetailsPassed ?
											<div className={'form-group' + (userCheckSubmitted && !panCardNo ? ' has-error' : '')}>
												<label>Pan Card Number</label>
												<input type="text" className="form-control" placeholder="Pan Number" name="panCardNo" value={panCardNo} onChange={this.handleChange} />
											</div> :
											<div className={'form-group' + (userDetailsSubmitted && !lastName ? ' has-error' : '')}>
												<label>Last name</label>
												<input type="text" className="form-control" placeholder="Last name" name="lastName" value={lastName} onChange={this.handleChange} />
											</div>
										}

										{
											userDetailsPassed ?
											<div className={'form-group' + (userCheckSubmitted && !mobileNo ? ' has-error' : '')}>
												<label>Mobile Number</label>
												<input type="number" className="form-control" placeholder="Mobile Number" name="mobileNo" value={mobileNo} onChange={this.handleChange} />
											</div> :
											<div className={'form-group' + (userDetailsSubmitted && !email ? ' has-error' : '')}>
												<label>Email address</label>
												<input type="email" className="form-control" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
											</div>
										}

										{
											userDetailsPassed ?
											'' :
											<div className={'form-group' + (userDetailsSubmitted && !password ? ' has-error' : '')}>
												<label>Password</label>
												<input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={this.handleChange} />
											</div>
										}
										
										{
											userDetailsPassed ?
											<button type="submit" className="btn btn-primary btn-block">Register</button> :
											<button type="submit" className="btn btn-primary btn-block">Continue</button>
										}
										
										<p className="signed-up text-right">
											Already registered <a href="/login">Sign in?</a>
										</p>
									</form>

									{
										accountCreated ?
										<SnackbarContent
											message={
											'Account created successfully. Head over to login'
											}
											color="success"
										/> :
										""
									}

									{
										errorOccured ?
										<SnackbarContent
											message={
											'Account not created'
											}
											color="danger"
										/> :
										""
									}

								</div>
							</div>
						</div>
					</div>
				}
			</div>
        );
    }
}