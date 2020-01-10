import React, { Component } from 'react';
import './auth.scss';

import { signIn as signInService } from '../../services/authentication';

class AuthenticationSignInView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmission = this.handleFormSubmission.bind(this);
	}

	handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	async handleFormSubmission(event) {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			const user = await signInService({ email, password });
			console.log(user, this.props);
			this.props.changeAuthenticationStatus(user);
			this.props.history.push(`/userprofile`);
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<div className="Login">
				<div className="LoginformDiv">
					<form className="Loginform" onSubmit={this.handleFormSubmission}>
						<input
							className="email"
							type="email"
							placeholder="Email"
							value={this.state.email}
							name="email"
							onChange={this.handleInputChange}
						/>
						<input
							type="password"
							placeholder="Password"
							value={this.state.password}
							name="password"
							onChange={this.handleInputChange}
						/>
						<button className="myButton">Sign In</button>
					</form>
				</div>
			</div>
		);
	}
}

export default AuthenticationSignInView;
