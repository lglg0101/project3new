import React, { Component } from 'react';
import {
	load as loadPostService,
	edit as editPostService,
	remove as removePostService
} from './../../services/posts';
import './Posts.css';

class PostEditView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: null
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmission = this.handleFormSubmission.bind(this);
		this.onDeleteTrigger = this.onDeleteTrigger.bind(this);
	}
	async componentDidMount() {
		const id = this.props.match.params.id;
		try {
			const post = await loadPostService(id);
			this.setState({
				post
			});
		} catch (error) {
			console.log(error);
		}
	}
	handleInputChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		// console.log(name, value);
		this.setState({
			// [name]: value
			post: {
				...this.state.post,
				[name]: value
			}
		});
		/*
    this.setState(previousState => ({
      note: {
        ...previousState.note,
        [name]: value
      }
    }));
    */
	}
	async handleFormSubmission(event) {
		event.preventDefault();
		const post = this.state.post;
		const id = this.props.match.params.id;
		try {
			await editPostService(id, post);
			this.props.history.push(`/${id}`);
		} catch (error) {
			console.log(error);
		}
	}
	async onDeleteTrigger() {
		const id = this.props.match.params.id;
		try {
			await removePostService(id);
			this.props.history.push(`/list`);
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const post = this.state.post;
		return (
			<main>
				{post && (
					<form onSubmit={this.handleFormSubmission}>
						<textarea
							placeholder="Text"
							value={post.text || ''}
							name="text"
							onChange={this.handleInputChange}
						></textarea>
						<button>Edit Post</button>
					</form>
				)}
				<button onClick={this.onDeleteTrigger}>Delete Post</button>
			</main>
		);
	}
}
export default PostEditView;
