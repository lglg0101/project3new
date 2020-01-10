import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';

import { load as loadReviewService } from './../../services/reviews';

class ReviewSingleView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			review: null
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
		console.log(id);
		try {
			const review = await loadReviewService(id);
			this.setState({
				review
			});
		} catch (error) {
			console.log(error);
			// this.props.history.push("/error/404");
		}
	}

	render() {
		const review = this.state.review;
		const id = this.props.match.params.id;
		return (
			<main className="mainSingleView">
				{review && (
					<div className="ReviewSingleView">
						<p>{review.text}</p>
						<img src={review.image} alt=""/>
					<Link to={`/stores/${review._shop}`}> <h3 className='EditReviewsp'>Link to the Store</h3></Link> 
					<Link  to={`/${id}/edit`}> <h3 className='EditReviewsp'>Delete Review</h3></Link>
					</div>
				)}
			</main>
		);
	}
}

export default ReviewSingleView;
