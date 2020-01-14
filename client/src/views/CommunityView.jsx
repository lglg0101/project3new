import React, { Component } from 'react';
import './Community.css';
import './../components/Navbar.scss';

import PostCreateView from './postView/PCreate';
import PostSingleView from './postView/PSingle';
import PostListView from './postView/PList';
import { list as listPostService } from './../services/posts';

import ReviewCreateView from './reviewsView/RCreate';
import ReviewSingleView from './reviewsView/RSingle';
import ReviewListView from './reviewsView/RList';
import { list as listReviewService } from './../services/reviews';

import communityImg from '../images/tapecommunity.png';

import Navbar from './../components/Navbar';

export class CommunityView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			reviews: []
		};
		this.fetchData = this.fetchData.bind(this);
	}

	async fetchData() {
		try {
			const posts = await listPostService();
			const reviews = await listReviewService();
			this.setState({
				posts,
				reviews
			});
		} catch (error) {
			console.log(error);
		}
	}

	async componentDidMount() {
		this.fetchData();
	}

	// 	try {
	// 		const posts = await listPostService();
	// 		const reviews = await listReviewService();

	// 		this.setState({
	// 			posts,
	// 			reviews
	// 		});
	// 		this.props.history.push('/community');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.prevState !== this.state.posts) {
	// 		this.fetchData();
	// 	}
	// }

	render() {
		console.log('REVIEWS ON RENDER COMMUNITY VIEW', this.state.reviews);
		return (
			<div className="communityContainer">
				<div class="navBar">
					<Navbar
						user={this.props.user}
						{...this.props}
						changeAuthenticationStatus={this.changeAuthenticationStatus}
					/>{' '}
				</div>

				<div className="communityHeader">
					<img className="communityHeaderImg" src={communityImg} alt="" />
				</div>

				<div className="contentContainer">
					<div className="postContainer">
						<div className="messageBoardHeader">
							<h1>Message Board</h1>
							<p>Check Out What The Stores Around You Are Posting!</p>
						</div>

						<PostListView posts={this.state.posts} />
					</div>

					<div className="reviewContainer">
						<div className="reviewHeader">
							<h1>Reviews</h1>
							<p>These Are Some Of Our Other User's Reviews!</p>
						</div>

						<ReviewListView reviews={this.state.reviews} />
					</div>
				</div>
			</div>
		);
	}
}

export default CommunityView;
