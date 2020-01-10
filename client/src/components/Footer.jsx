import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './../views/HomePage.scss';
import './Footer.scss';

class Footer extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.onSignOutTrigger = this.onSignOutTrigger.bind(this);
	// }

	render() {
		const user = this.props.user;
		return (
			<footer className="footer">
				<Fragment>
					<div className="footer">
						<p>#slowfashion #thriftcommunity</p>
					</div>
				</Fragment>
			</footer>
		);
	}
}

export default Footer;
