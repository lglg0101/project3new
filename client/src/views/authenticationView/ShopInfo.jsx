import React, { Component } from 'react';
import AutocompletePlace from './../../components/AutoComplete';

import './auth.scss';
import { shopInfo as shopInfoService } from './../../services/shops';

export default class ShopInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shop: {
				shopName: null,
				telephone: '',
				image: '',
				workingHours: '',
				//adress: "",
				bio: '',
				coordinates: []
			}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmission = this.handleFormSubmission.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			shop: {
				...this.state.shop,
				[name]: value
			}
		});
	}

	handleFileChange(event) {
		//console.dir(event.target.files);
		const file = event.target.files[0];
		this.setState({
			shop: {
				...this.state.shop,
				image: file
			}
		});
	}

	async handleFormSubmission(event) {
		event.preventDefault();
		const shopData = this.state.shop;
		console.log('SHOP DATA ON THE FORM', shopData);
		try {
			const shop = await shopInfoService(shopData);
			console.log('SHOP AFTER CREATE SERVICE', shop);
			//this.props.changeAuthenticationStatus(user);
			this.props.redirect(`/shopprofile`);
		} catch (error) {
			console.log(error);
		}
	}

	handleSelect(place) {
		this.setState({
			shop: {
				...this.state.shop,
				shopAdress: place.place_name,
				coordinates: place.center
			}
		});
	}

	render() {
		return (
			<div className="shopFormContainer">
				{!this.state.shop._owner && (
					<form className="ShopInfoForm" onSubmit={this.handleFormSubmission}>
						<div className="SignUpForm">
							{/* <h1 className="shopGreeting">
								Hey, Shop Owner! Add Some Extra Details to Register Your Shop.
							</h1> */}

							<input
								className="shopFormPlaceholder"
								type="text"
								placeholder="Shop Name"
								value={this.state.shopName}
								name="shopName"
								onChange={this.handleInputChange}
							/>

							<AutocompletePlace
								className="autoComplete"
								onSelect={this.handleSelect}
							/>

							{/* <input
              type="text"
              placeholder="Add Your Store Adress"
              value={this.state.shopAdress}
              name="shopAdress"
              onChange={this.handleInputChange}
            />       */}

							<input
								className="fileUpload shopFormPlaceholder"
								type="file"
								placeholder="Add an image of your store"
								name="image"
								onChange={this.handleFileChange}
							/>
							<input
								className="shopFormPlaceholder"
								type="text"
								placeholder="Working Hours"
								value={this.state.workingHours}
								name="workingHours"
								onChange={this.handleInputChange}
							/>
							<input
								className="shopFormPlaceholder"
								type="string"
								placeholder="Telephone"
								value={this.state.telephone}
								name="telephone"
								onChange={this.handleInputChange}
							/>
							<input
								className="shopFormPlaceholder"
								type="text"
								placeholder="Add Extra Information"
								value={this.state.bio}
								name="bio"
								onChange={this.handleInputChange}
							/>
						</div>

						<button className="shopInfoBtn myButton">
							Add Shop Information
						</button>
					</form>
				)}
			</div>
		);
	}
}
