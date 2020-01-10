import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { load as loadPostService } from '../../services/posts';
import './Posts.css';

class PostSingleView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: null
		};
	}
	async componentDidMount() {
		const id = this.props.match.params.id;
		console.log(id);
		try {
			const post = await loadPostService(id);
			this.setState({
				post
			});
		} catch (error) {
			console.log(error);
			// this.props.history.push("/error/404");
		}
	}
	render() {
		const post = this.state.post;
		const id = this.props.match.params.id;
		return (
			<main className="mainSingleView">
				{post && (
					<div className="ReviewSingleView">
						<img src={post.image} />
						<p>{post.text}</p>
						<Link to={`/${id}/edit`}>Edit Post</Link>
						<Link to={`/stores/${post._shop}`}>Link to Shop</Link>

					</div>
				)}
			</main>
		);
	}
}
export default PostSingleView;
