import React, { Component } from 'react';
import { loadAllShops } from './../services/shops';
import './../views/Stores.scss';
// import api from "../../api";
// import '../../index.scss';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'; // NEW
import 'mapbox-gl/dist/mapbox-gl.css'; // Import of Mapbox CSS
mapboxgl.accessToken =
	'pk.eyJ1IjoibGdsZzAxMDEiLCJhIjoiY2s0YTc2bzkzMDEzNTNxcDhkNXlkcHEwcyJ9.69gWhkPB4Gb7_2E9-EzvsQ';

export default class MapView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lng: '',
			lat: '',
			shops: null
		};
		this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
		this.initMap = this.initMap.bind(this);
		this.mapRef = React.createRef();
		this.map = null;
		this.marker = null;
	}
	initMap(lng, lat) {
		console.log('lng', lng, 'lat', lat);
		this.map = new mapboxgl.Map({
			container: this.mapRef.current,
			style: 'mapbox://styles/mapbox/light-v10',
			center: [lng, lat],
			zoom: 12
		});
		this.map.addControl(new mapboxgl.NavigationControl());
		this.marker = new mapboxgl.Marker({ color: 'red' })
			.setLngLat([lng, lat])
			.addTo(this.map);
		for (let i = 0; i < this.state.shops.length; i++) {
			let popup = new mapboxgl.Popup().setHTML(
				`<a class="linkClass" href="https://localhost:3000/stores/${this.state.shops[i]._id}"<b>${this.state.shops[i].shopName}</b> <br>
        </a>
      `
			);
			let lng = this.state.shops[i].coordinates[0];
			let lat = this.state.shops[i].coordinates[1];
			console.log('WHAT IS THE COORDINATES', this.state.shops[i].coordinates);
			console.log('lng', lng, 'lat', lat);

			new mapboxgl.Marker({ color: 'blue' })
				.setLngLat([lng, lat])
				.setPopup(popup)
				.addTo(this.map);
		}
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
				<div className="map-header"></div>
				<div className="map-container">
					<div
						className="mapbox"
						ref={this.mapRef}
						style={{ height: 400, width: 700 }}
					/>
				</div>
				<h3 className="storeClick">Click On The Marker To Visit The Store Page</h3>
			</div>
		);
	}
	componentDidMount() {
		loadAllShops().then(shops => {
			console.log('SHOPS', shops);

			this.setState({
				shops: shops
			});
			this.getCurrentCoordinates();
		});
	}
}
