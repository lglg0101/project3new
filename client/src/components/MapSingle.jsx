import React, { Component } from "react";
import { loadShopInfo } from "./../services/shops";
// import api from "../../api";
// import '../../index.scss';
import mapboxgl from "mapbox-gl/dist/mapbox-gl"; // NEW
import "mapbox-gl/dist/mapbox-gl.css"; // Import of Mapbox CSS
mapboxgl.accessToken =
  "pk.eyJ1IjoibGdsZzAxMDEiLCJhIjoiY2s0YTc2bzkzMDEzNTNxcDhkNXlkcHEwcyJ9.69gWhkPB4Gb7_2E9-EzvsQ";

export default class MapSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: "",
      lat: "",
      shop: null
    };
    this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
    this.initMap = this.initMap.bind(this);
    this.mapRef = React.createRef();
    this.map = null;
    this.marker = null;
  }
  initMap(lng, lat) {
    console.log("lng", lng, "lat", lat);
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: 8
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.marker = new mapboxgl.Marker({ color: "#662d91" })
      .setLngLat([lng, lat])
      .addTo(this.map);
    // for (let i = 0; i < this.state.shops.length; i++) {
      let popup = new mapboxgl.Popup();
      // .setHTML(
      //   `<a class="linkClass" href="https://ih-smart-shelf.herokuapp.com/libraries/${this.state.shops[i]._id}"<b>${this.state.shops[i].shopName}</b> <br>
      //   </a>
      // `)
      // let lng = this.state.shop.coordinates[0];
      // let lat = this.state.shop.coordinates[1];
    

      new mapboxgl.Marker({ color: "#ffcc05" })
        .setLngLat([this.state.shop.coordinates[0], this.state.shop.coordinates[1]])
        // .setPopup(popup)
        .addTo(this.map);
    // }
  }

  getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        });
        this.initMap(this.state.lng, this.state.lat);
      });
    }
  };
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div className="Map">
        <div className="map-header">
       </div>
        <div className="map-container">
          <div className="mapbox" ref={this.mapRef} style={{ height: 400 }} />
        </div>
            </div>
    );
  }
  componentDidMount() {
    // this.props.match.params.
    loadShopInfo().then(shop => {
      this.setState({
        shop: shop
      });
      this.getCurrentCoordinates();
    });
  }
}
