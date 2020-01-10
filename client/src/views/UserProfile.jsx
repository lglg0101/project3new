import React, { Component } from 'react';

import PostListView from './postView/PList';
import ReviewListView from './reviewsView/RList';
import ShopInfo from './authenticationView/ShopInfo';
import { Link } from 'react-router-dom';

import { loadUserInformation } from './../services/authentication.js';
import { list as listReviewService } from './../services/reviews.js';
import { list as listPostService } from './../services/posts.js';
import Navbar from './../components/Navbar';
import { loadMyShop } from './../services/shops.js';

import './Profile.scss';
import './../components/Navbar.scss';

export default class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			posts: [],
			shop: null
		};
		this.redirect = this.redirect.bind(this);
	}

	async componentDidMount() {
		try {
			const reviews = await listReviewService();
			const posts = await listPostService();
			const shop = await loadMyShop();

			console.log(reviews);
			console.log('USER', this.props.user._id);

			this.setState({
				reviews,
				posts,
				shop
			});
		} catch (error) {
			console.log(error);
		}
	}
	redirect(url) {
		this.props.history.push(url);
	}

	render() {
		const user = this.props.user;

		return (
			<div className="profile">
				{user && (
					<div>
						<div class="navBar">
							<Navbar
								user={this.props.user}
								{...this.props}
								changeAuthenticationStatus={this.changeAuthenticationStatus}
							/>{' '}
							/>
						</div>
						<div className="profileContainer">
							<div className="titleContainer">
								<h1 className="title">{user.username}'S Profile</h1>
							</div>
							<div>
								<div className="shopLink">
									{' '}
									{user.isShop && !this.state.shop && (
										<ShopInfo redirect={this.redirect} />
									)}
									{user.isShop && this.state.shop && (
										<Link className="shopLink" to="/shopprofile">
											{this.state.shop.shopName}'S Store Page
										</Link>
									)}
								</div>
							</div>

							<div className="userInfo">
								<div className="picContainer">
									<img className="profilePic" src={user.image} alt="" />
								</div>
<div className="bioAndLocation">
								<div className="bioContainer">
									<h1>{user.bio}</h1>
								</div>
								<div className="cityContainer">
									<h1>Location: {user.city}</h1>
								</div>
							</div>
						</div>
						</div>

						<div className="centerButton">
							<button className="myButton">Follow Me</button>
							<button className="myButton">My Favourites</button>
					
						</div>
					</div>
				)}
			</div>
		);
	}
}
