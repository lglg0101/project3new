import React, { Component, Fragment } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import Footer from "./../components/Footer";
import { signOut as signOutService } from "./../services/authentication";
// import bubblegum from '../images/bubblegum.jpg';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onSignOutTrigger = this.onSignOutTrigger.bind(this);
  }

  async onSignOutTrigger() {
    try {
      await signOutService();
      this.props.changeAuthenticationStatus(null);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    return (
      <Fragment>
        <div className="d-flex homeContainer">
          <div className="d-flex headerContainer">
            <h1>THRIFT POINT</h1>

            <div className="d-flex linksContainer">
              {!user && (
                <Link className="d-flex myButton" to="/sign-in">
                  SIGN IN
                </Link>
              )}

              {!user && (
                <Link className="d-flex myButton2" to="/sign-up">
                  SIGN UP
                </Link>
              )}

              {user && (
                <Link className="d-flex myButton" to="/userprofile">
                  YOUR PROFILE
                </Link>
              )}

              {user && (
                <button
                  className="d-flex myButton2"
                  onClick={this.onSignOutTrigger}
                >
                  SIGN OUT
                </button>
              )}
            </div>
          </div>

          <div className="d-flex stickerContainer">
            <div className="d-flex community">
              <Link className="d-flex homeLinkC" to="/community">
                COMMUNITY
              </Link>
            </div>
            <div className="d-flex stores">
              <Link className="d-flex homeLinkS" to="/stores">
                STORES
              </Link>
            </div>
          </div>
          <div></div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default HomePage;
