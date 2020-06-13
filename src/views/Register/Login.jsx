import React, { Component } from "react";
import '../../variables/css/bootstrap.css';
import '../../variables/css/registerStyle.css'
import axios from "axios";
import {SnackbarContent} from "components"
import {Redirect} from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false,
			email: '',
			password: '',
            userDetailsSubmitted: false,
            errorOccured: false,
            userAlreadyLoggedIn: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);
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

		this.setState({ userDetailsSubmitted: true });
        const { email, password } = this.state;

        // TODO: Add rigid checks
        if (email && password) {
            // Login user
            let userFormData = new FormData()
            userFormData.set('email', email);
            userFormData.set('password', password);
            let ctx = this;
            var proxy = ""
            if(process.env.NODE_ENV === "production")
                proxy = "https://crypto-manager-prod.herokuapp.com"

            axios.post(
                proxy + '/user/account/login',
                userFormData
            )
            .then(res => {
                if(res['data']['statusCode'] === 200) {
                    let data = new FormData();
                    const token = res['data']['auth_token']
                    data.set('Authorization', token);
                    axios.post(
                        proxy + '/user/details',
                        data
                    )
                    .then(res => {
                        var userData = res['data']['data'];
                        userData['token'] = token;
                        localStorage.setItem('user', JSON.stringify(userData));
                        this.setState({
                            redirectToReferrer: true
                        })
                        // window.open("/dashboard","_self")
                    })
                    .catch(err => {
                        ctx.setState({errorOccured: true});
                    })
                }
                else
                    ctx.setState({errorOccured: true});
            })
            .catch(err => {
                console.log(err);
                ctx.setState({errorOccured: true});
            })
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
        const { from } = this.props.location.state || {from: {pathname: '/dashboard'}};
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }
        const { email, password, userDetailsSubmitted, errorOccured, userAlreadyLoggedIn } = this.state;
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
                                        <h3>Sign In</h3>

                                        <div className={'form-group' + (userDetailsSubmitted && !email ? ' has-error' : '')}>
                                            <label>Email address</label>
                                            <input type="email" className="form-control" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
                                        </div>

                                        <div className={'form-group' + (userDetailsSubmitted && !password ? ' has-error' : '')}>
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={this.handleChange} />
                                        </div>
                                        <p className="forgot-password text-right">
                                            Forgot <a href="#">password?</a>
                                        </p>
                                        {/* <div className="form-group">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                            </div>
                                        </div> */}

                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>

                                        <div className="already-registered">
                                            <p className="forgot-password text-right">
                                                Not registered yet <a href="/signup">Sign up?</a>
                                            </p>
                                        </div>
                                    </form>

                                    {
                                        errorOccured ?
                                        <SnackbarContent
                                            message={
                                            'Login unsuccessful'
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