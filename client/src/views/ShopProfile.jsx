import React, { Component, Fragment } from 'react';

import PostListView from './postView/PList';
import PostCreateView from './postView/PCreate';
import ReviewListView from './reviewsView/RList';
import { Link } from 'react-router-dom';
import './ShopProfile.scss';

import { loadUserInformation } from './../services/authentication.js';
import { list as listReviewService } from './../services/reviews.js';
import { postsForShop } from './../services/posts.js';
import { loadAllShops, loadShopInfo, loadMyShop } from './../services/shops.js';

import Navbar from './../components/Navbar';
import './../components/Navbar.scss';

export default class ShopProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			posts: [],
			shop: null
		};
		// this.fetchData = this.fetchData.bind(this);
	}

	async fetchData() {
		try {
			const posts = await postsForShop();
			console.log('POSTS AFTER FECTH', posts);
			this.setState({
				posts
				// reviews
			});
		} catch (error) {
			console.log(error);
		}
	}

	async componentDidMount() {
		this.fetchData();
		try {
			const shop = await loadMyShop();
			this.setState({
				shop: shop
			});
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const user = this.props.user;
		const shop = this.state.shop;
		console.log(shop);

		return (
			<div className="shopProfileContainer">
				{/* CHILD 1 */}
				<div className="navBar">
					<Navbar
						user={this.props.user}
						{...this.props}
						changeAuthenticationStatus={this.changeAuthenticationStatus}
					/>{' '}
				</div>

				{/* CHILD 2*/}
				<div className="shopHeader">
					<h1 className="title">Welcome To Your Store Profile</h1>
					<p>
						Make sure to keep your customers up to date with details of your
						favorite items in your store!
					</p>
				</div>

				{/* {!this.state.shop && (
          <pre>{JSON
          .stringify(this.state.shop, 2, null)}</pre>
        )} */}

				{/* CHILD 3*/}

				{shop && (
					<div>
						<div className="shopName">{shop && <h1>{shop.shopName}</h1>}</div>
						{/* CHILD 4*/}
						<div className="information">
							<div className="shopInfo1">
								{' '}
								<img className="profilePic" src={shop.image} alt="" />
								{user && user.isShop && (
									<Link className="myButton" to="/userprofile">
										GO Back To Your User Profile
									</Link>
								)}
							</div>{' '}
							{/* CHILD 5*/}
							<div className="shopInfo2">
								<div className="infoHeader">
									<h1>STORE INFORMATION</h1>
								</div>

								<div>
									<p className="shopInfotext">
										Telephone Number:
										{shop && <p>{shop.telephone}</p>}
									</p>

									<p className="shopInfotext">
										Working Hours:
										{shop && <p>{shop.workingHours}</p>}
									</p>
									<p className="shopInfotext">
										Address:
										{shop && <p>{shop.shopAdress} </p>}
									</p>
									<p className="shopInfotext">
										BIO:
										{shop && <p>{shop.bio} </p>}
									</p>
								</div>
							</div>
						</div>
						{/* CHILD 6*/}
						<div className="contentDisplay">
							{/* {user.isShop && ( */}
							<div className="postContainer2">
								<div>
									{' '}
									<PostCreateView
										shop={this.state.shop}
										onPostCreated={this.fetchData}
									/>
								</div>

								<div>
									<PostListView
										shop={this.state.shop}
										posts={this.state.posts}
									/>
								</div>
							</div>
							{/* )} */}

							{/* <div className="reviewContainer">{/* <ReviewListView /> */}
						</div>{' '}
						*/}
					</div>
					// </div>
				)}
			</div>
		);
	}
}
