import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link, Fragment } from "react-router-dom";
import "./App.css";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import MapboxAutocomplete from "react-mapbox-autocomplete";

import AuthenticationSignUpView from "./views/authenticationView/SignUpView";
import AuthenticationSignInView from "./views/authenticationView/LoginView";

import Navbar from "./components/Navbar";

import HomePage from "./views/HomePage.jsx";
import SignOut from "./views/authenticationView/SignOutView";
import CommunityView from "./views/CommunityView";

import PostCreateView from "./views/postView/PCreate";
import PostSingleView from "./views/postView/PSingle";
import PostListView from "./views/postView/PList";
import PostEditView from "./views/postView/PEdit";
import SingleStoreView from "./views/SingleStoreView";
import ReviewCreateView from "./views/reviewsView/RCreate";
import ReviewSingleView from "./views/reviewsView/RSingle";
import ReviewListView from "./views/reviewsView/RList";
import ReviewDeleteView from "./views/reviewsView/RDelete";

import MapSingle from "./components/MapSingle";
import MapView from "./components/Map";
import Stores from "./views/Stores";
import ShopInfo from "./views/authenticationView/ShopInfo";

import Rating from "react-rating";
import UserProfile from "./views/UserProfile";
import ShopProfile from "./views/ShopProfile";

import { loadUserInformation as loadUserInformationService } from "./services/authentication";
import { loadAllShops as shopInfoService } from "./services/shops";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false,
      shop: null
    };
    this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(
      this
    );
    this.verifyAuthentication = this.verifyAuthentication.bind(this);

    this.shopInfoService = this.shopInfoService.bind(this);
  }

  async componentDidMount() {
    console.log('Im component did mount and im running')
    try {
      console.log('Im trying')
      const user = await loadUserInformationService();
      const shop = await shopInfoService();
      console.log('Here are the shops', shop)
      this.setState({
        user,
        loaded: true,
        shop
      });
    } catch (error) {
      console.log(error);
    }
  }

  shopInfoService(shop) {
    this.setState({
      shop
    });
  }

  changeAuthenticationStatus(user) {
    this.setState({
      user
    });
  }

  verifyAuthentication() {
    return this.state.user;
  }

  render() {
    const user = this.state.user;
    const shop = this.state.shop;
    console.log("SHOP INFO", shop);

    return (
      <div className="home">
        <BrowserRouter>
          {this.state.loaded && (
            <Switch>
              {/* <ProtectedRoute
                path="/create"
                // component={NoteCreateView}
                render={props => <NoteCreateView {...props} />}
                verify={this.verifyAuthentication}
                redirect="/error/401"
              /> */}
              {/* <Route exact path="/sign-out" component={SignOut} /> */}
             
              <Route exact path="/shop-info " component={ShopInfo} />
              <Route
                path="/shop-info"
                render={props => (
                  <ShopInfo
                    {...props}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
              <Route
                path="/shopprofile"
                render={props => (
                  <ShopProfile
                    {...props}
                    user={this.state.user}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
              {/* <Route exact path="/shopprofile " component={ShopProfile} /> */}
              <Route exact path="/community" component={CommunityView} />
              <Route exact path="/stores" component={Stores} />
              <Route
                exact
                path="/stores/:id"
                render={props => (
                  <SingleStoreView
                    {...props}
                    user={this.state.user}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
              <Route exact path="/post/create" component={PostCreateView} />
              <Route exact path="/post/list" component={PostListView} />
              <Route exact path="/review/create" component={ReviewCreateView} />
              <Route exact path="/review/list" component={ReviewListView} />
              <Route exact path="/post/:id" component={PostSingleView} />
              <Route path="/:id/edit" component={PostEditView} />
              <Route exact path="/review/:id" component={ReviewSingleView} />>
              <Route path="/:id/delete" component={ReviewDeleteView} />
              <Route
                path="/sign-up"
                render={props => (
                  <AuthenticationSignUpView
                    {...props}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
              <Route
                path="/sign-in"
                render={props => (
                  <AuthenticationSignInView
                    {...props}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
              <Route path="/map" component={MapView} />
              <Route path="/mapsingle" component={MapSingle} />
              {/* WHAT YOU SHOULD DO TO SEND THE USER STATE(THAT LIVE ON THE APP JS TO
						THE OTHER COMPONENTS) */}
              <Route
                exact
                path="/userprofile"
                render={props => (
                  <UserProfile
                    {...props}
                    user={this.state.user}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
              {/* <Route
							path="/userprofile"
							exact
							render={props => (
								<PostListView {...props} post={this.props.posts} />
							)}
						/> */}
              {/* <Route path="/userprofile" component={AuthenticationPrivateView} /> */}
              {/* <Route path="/error/:code" component={} />
              <Route path="/" exact component={} />
             
              <Route path="/:id" component={} /> */}
              {/* <Redirect to="/error/404" /> */}
			  <Route
                exact
                path="/"
                render={props => (
                  <HomePage
                    {...props}
                    user={this.state.user}
                    changeAuthenticationStatus={this.changeAuthenticationStatus}
                  />
                )}
              />
            </Switch>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
