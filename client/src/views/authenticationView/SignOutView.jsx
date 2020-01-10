import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './auth.scss';

export default class SignOut extends Component {
	render() {
		return (
			<div>
				<Link to="/">
					<h1>You Are Signed Out</h1>
					<p> GO BACK TO THE HOME PAGE</p>
				</Link>
			</div>
		);
	}
}
