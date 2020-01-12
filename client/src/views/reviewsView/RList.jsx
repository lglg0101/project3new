import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';
import Rating from 'react-rating';

import { list as listReviewService } from './../../services/reviews';

class ReviewListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: []
		};
	}
	// async componentDidMount() {
	// 	try {
	// 		const reviews = await listReviewService();
	// 		this.setState({
	// 			reviews
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	console.log(this.state.reviews);
	// }

	render() {
		console.log(this.props.reviews);
		return (
			<Fragment>
				<main className="reviewListContainer">
					{this.props.reviews.map(review => (
						<Fragment>
							<Link
								className="linkReview"
								key={review._id}
								to={`/review/${review._id}`}
							>
							
								<h2 className="reviewColorUser"> SHOP REVIEWED: {review._shop.shopName}</h2>
					
								{/* <Rating/> */}
								<div className="oneReview">
								<div className="oneReviewText">
								<h1 className="reviewH1">"{review.text}"</h1>
								</div>
								<img className="reviewImg" src={review.image} alt="" />
							
								<h2 className="reviewColor">Reviewed By: {review._author.username}</h2>
								<h2 className="createdAt">Created At: {review.createdAt}</h2>
								</div>
							</Link>
						</Fragment>
					))}
				</main>
			</Fragment>
		);
	}
}

export default ReviewListView;
