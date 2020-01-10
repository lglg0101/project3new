import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { list as listPostService } from './../../services/posts';
import './Posts.css';



class PostListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}
	// async componentDidMount() {
	//   try {
	//     const posts = await listPostService();
	//     this.setState({
	//       posts
	//     });
	//   } catch (error) {
	//     console.log(error);
	//   }
	//   console.log(this.state.posts);
	// }
	render() {
		return (
			<main className = "postListContainer">
			{/* <div className = "postsContainer"> */}
				{this.props.posts.map(post => (
					<Link  
					className="postLink" 
					key={post._id} 
					to={`/post/${post._id}`}>
					
					{/* <p className="postP">Posted By:</p> */}
					<p className="postColor"> STORE OWNER: {post._author.username}</p>
						<h1 className="postH1">{post.text}</h1>
						<img className="postImg" src={post.image} alt="" />
						<h2 className="createdAt">Created At: {post.createdAt}</h2>
					</Link>
				))}
				{/* </div> */}
			</main>
		);
	}
}
export default PostListView;
