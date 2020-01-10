import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import home from '../images/home.png';
import profile from '../images/profilee.png';
import location from '../images/location.png';
import community from '../images/community.png';
import signout from '../images/sign-out.png';
import './Navbar.scss';

import { signOut as signOutService } from './../services/authentication';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.onSignOutTrigger = this.onSignOutTrigger.bind(this);
	}

	async onSignOutTrigger() {
		try {
			await signOutService();
			this.props.changeAuthenticationStatus(null);
			this.props.history.push('/');
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const user = this.props.user;
		console.log('THIS IS WHAT YOU WANT', this.props);
		return (
			<nav className="NavContainer">
				<Fragment>
					<div className="NavTitle">
						<Link to="/">
							{' '}
							<h1 className="HomeLink">THRIFT POINT</h1>{' '}
						</Link>{' '}
					</div>

					<div className="NavIcons">
						<Link to="/stores">
							{' '}
							<img src={location} alt="stores" />
						</Link>{' '}
						<Link to="/">
							{' '}
							<img src={home} alt="home" />
						</Link>{' '}
						<Link to="/community">
							{' '}
							<img src={community} alt="community" />
						</Link>{' '}
						<Link to="/userprofile">
							{' '}
							<img src={profile} alt="profile" />
						</Link>

               
					</div>
				</Fragment>
			</nav>
		);
	}
}

export default Navbar;
