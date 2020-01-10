import React, { Component } from "react";
import axios from "axios";
import MapboxAutocomplete from "react-mapbox-autocomplete";

import "./auto.scss";

export default class AutocompletePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      isLoading: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);

    // if (!process.env.REACT_APP_MAPBOX_API_KEY) {
    //   throw new Error(
    //     "You don't have any 'process.env.REACT_APP_MAPBOX_API_KEY'"
    //   );
    // }
  }
  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
      isLoading: true
    });
    // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId);
    // Launch a new request in 1000ms
    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 1000);
  }
  performSearch() {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false
      });
      return;
    }
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=pk.eyJ1IjoibGdsZzAxMDEiLCJhIjoiY2s0YTc2bzkzMDEzNTNxcDhkNXlkcHEwcyJ9.69gWhkPB4Gb7_2E9-EzvsQ`
      )
      .then(response => {
        this.setState({
          results: response.data.features,
          isLoading: false
        });
      });
  }
  handleItemClicked(place) {
    this.setState({
      search: place.place_name,
      results: []
    });
    console.log(place);
    this.props.onSelect(place);
  }
  render() {
    return (
      <div>
        <div className="AutocompletePlace">
          <input
            className="AutocompletePlace-input"
            type="text"
            value={this.state.search}
            onChange={this.handleSearchChange}
            placeholder="Type an address"
          />
          <ul className="AutocompletePlace-results">
            {this.state.results.map(place => (
              <li
                key={place.id}
                className="AutocompletePlace-items"
                onClick={() => this.handleItemClicked(place)}
              >
                {place.place_name}
              </li>
            ))}
            {this.state.isLoading && (
              <li className="AutocompletePlace-items">Loading...</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
