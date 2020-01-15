import React, { Component } from "react";
import "./Reviews.css";

import {
  load as loadReviewService,
  edit as editReviewService,
  remove as removeReviewService
} from "./../../services/reviews";

class ReviewDeleteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.onDeleteTrigger = this.onDeleteTrigger.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const review = await loadReviewService(id);
      this.setState({
        review
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
      review: {
        ...this.state.review,
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
  	const review = this.state.review;
  	const id = this.props.match.params.id;
  	try {
  		await editReviewService(id, review);
  		this.props.history.push(`/${id}`);
  	} catch (error) {
  		console.log(error);
  	}
  }

  async onDeleteTrigger() {
    const id = this.props.match.params.id;
    try {
      await removeReviewService(id);
      this.props.history.push(`/list`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const review = this.state.review;
    return (
      <main className="reviewDelete">
        {review && (
          <form onSubmit={this.handleFormSubmission}>
            <textarea
              placeholder="Text"
              value={review.text || ""}
              name="text"
              onChange={this.handleInputChange}
            ></textarea>
            <button>Edit Review</button>
          </form>
        )}
        {/* <button onClick={this.onDeleteTrigger}>Delete Review</button> */}
      </main>
    );
  }
}

export default ReviewDeleteView;
