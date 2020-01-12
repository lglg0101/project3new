import React, { Component, Link } from 'react';
import MapSingle from './../components/MapSingle';
import { loadShopInfo } from './../services/shops.js';
import Navbar from './../components/Navbar';
import ReviewCreateView from './../views/reviewsView/RCreate';
import ReviewListView from './../views/reviewsView/RList';
import { reviewsOfShop } from './../services/reviews';
import PostListView from './../views/postView/PList';
import { postsFromShop } from './../services/posts.js';
import './Profile.scss'

export default class SingleStoreView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			posts: [],
			shop: null
		};
		this.fetchData = this.fetchData.bind(this);
	}

	async fetchData() {
		const shopId = this.props.match.params.id;
		console.log('SHOP ID FROM PARAMS', shopId);
		try {
			const reviews = await reviewsOfShop(shopId);
			const posts = await postsFromShop(shopId);

			this.setState({
				reviews,
				posts
			});
		} catch (error) {
			console.log(error);
		}
	}

	async componentDidMount() {
		this.fetchData();
		try {
			const shop = await loadShopInfo(this.props.match.params.id);

			this.setState({
				shop: shop,
		

			});
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const user = this.props.user;
		const shop = this.state.shop;
		console.log('REVIEWS OF THIS SHOP', this.state.reviews);
		console.log('POSTS OF THIS SHOP', this.state.posts);
		console.log('STATE', this.state);

		return (
			<div>
				<div className="navBar">
					<Navbar
						user={this.props.user}
						{...this.props}
						changeAuthenticationStatus={this.changeAuthenticationStatus}
					/>
					
				</div>
	

				{/* {!this.state.shop && (
          <pre>{JSON.stringify(this.state.shop, 2, null)}</pre>
        )} */}
				<div className="profileContainer">


					{shop && (
						<div>
							<div>
								<h1 className="title">{shop.shopName}</h1>
								<div>

								</div>
								<div className='allOfShop'>
								<div className='shopPictureContainer'>
								<img className="shopPic" src={shop.image} alt="" />
                </div>

								<div className="shopInfo">
							

									<div className="shopInfo">
										<h1>SHOP INFORMATION</h1>
										<p className="shopInfotext">
											Telephone Number: {shop.telephone}
										</p>
										<p className="shopInfotext">
											Working Hours: {shop.workingHours}
										</p>
										<p className="shopInfotext">Address: {shop.shopAdress}</p>
									</div>
								</div>
							</div>
							</div>
							<div className="ReviewsAndPosts">
							<div className="ReviewsCreateAndPosted">

							<div className="createReview">
								{user && (
									<ReviewCreateView
										shop={this.state.shop}
										onReviewCreated={this.fetchData}
									/>
								)}
							</div>
						
								<div className='ReviewsStore'> 
									{' '}
									<ReviewListView reviews={this.state.reviews} />
								</div>
								</div>
								<div className='PostsStore'>
									<PostListView posts={this.state.posts} />
								</div>
								</div>
							
						</div>
					)}
				</div>
			</div>
		);
	}
}
