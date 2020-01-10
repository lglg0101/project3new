import React, { Component } from 'react';
import './Posts.css';
import { create as createPostService } from './../../services/posts';

class PostCreateView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {
				text: '',
				_author: '',
				image: null
			}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmission = this.handleFormSubmission.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		//console.log(this.props);
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
	// async handleFormSubmission(event) {
	//   event.preventDefault();
	//   const note = this.state.note;
	//   console.log(note);
	//   try {
	//     const noteDocument = await createNoteService(note);
	//     const id = noteDocument._id;
	//     this.props.history.push(`/${id}`);
	//   } catch (error) {
	//     console.log(error);
	//   }
	// }
	async handleFormSubmission(event) {
		event.preventDefault();
		const post = this.state.post;

		await createPostService(post);
		this.props.onPostCreated();
		// .then(newPost => this.props.history.push(`/post/list`))
		// .catch(error => console.log(error));
	}

	handleFileChange(event) {
		//console.dir(event.target.files);
		const file = event.target.files[0];
		this.setState({
			post: {
				...this.state.post,
				image: file
			}
		});
	}

	render() {
		const post = this.state.post;
		return (
			<main>
				<p className="pDescription">
					Hey, Shop Owner. This is where you can connect with your community.
					Let everyone know what cool things you have in store, or if you are in
					need of more donations!
				</p>
				{post && (
					<form onSubmit={this.handleFormSubmission}>
						<textarea
							placeholder="Write A Post To Your Customers! Tell them about any new products you have in, or if you need donations!"
							value={post.content || ''}
							name="content"
							onChange={this.handleInputChange}
						></textarea>
						<input type="file" name="image" onChange={this.handleFileChange} />
						<button className="createLink">Create Post</button>
					</form>
				)}
			</main>
		);
	}
}
export default PostCreateView;
