import React, { Component } from "react";
import Rating from "react-rating";
import "./Reviews.css";

import { create as createReviewService } from "./../../services/reviews";

class ReviewCreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {
        text: "",
        _author: "",
        // rating: '',
        image: ""
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
    console.log("SHOP ID FOR CREATION", this.props.shop._id);
    const shopId = this.props.shop._id;
    const reviewDocument = this.state.review;

    await createReviewService(reviewDocument, shopId);
    this.props.onReviewCreated();
    this.setState({
      review: {
        text: "",
        _author: "",
        // rating: '',
        image: ""
      }
    });

    // const reviewDocument = await createReviewService(review);
    // this.props.history.push(`/${id}`);
    // } catch (error) {
    // 	console.log(error);
    // }
  }

  handleFileChange(event) {
    //console.dir(event.target.files);
    const file = event.target.files[0];
    this.setState({
      review: {
        ...this.state.review,
        image: file
      }
    });
  }

  render() {
    const review = this.state.review;
    return (
      <main className="reviewForm">
        {review && (
          <form class="reviewFormContainer" onSubmit={this.handleFormSubmission}>
            <textarea
              placeholder="Write Your Review Here"
              value={review.text || ""}
              name="text"
              onChange={this.handleInputChange}
            ></textarea>
            <input type="file" name="image" onChange={this.handleFileChange} />
            {/* <Rating
							emptySymbol={
								<img
									src="https://raw.githubusercontent.com/dreyescat/react-rating/master/assets/images/star-empty.png"
									className="icon"
								/>
							}
							fullSymbol={
								<img
									src="https://raw.githubusercontent.com/dreyescat/react-rating/master/assets/images/star-full.png"
									className="icon"
								/> */}

            <button class="ReviewBtn" >Write Review</button>
          </form>
        )}
      </main>
    );
  }
}

export default ReviewCreateView;
