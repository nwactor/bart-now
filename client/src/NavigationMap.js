import React, { Component } from 'react';

var google = window.google;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

class NavigationMap extends Component {
	
	componentDidMount() {
		this.initMap();
		this.calcRoute(directionsService, directionsDisplay);
	}

	initMap() {
		var mapOptions = {
			zoom: 10,
			center:  {lat: 37.75, lng: -122.3}
		}
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		directionsDisplay.setMap(map);
	}

	calcRoute(directionsService, directionsDisplay) {
		//use == instead of === to account for undefined as well
		if(this.props.clientLocation == null || this.props.destination == null) {return;}
		
		directionsService.route({
		    origin: this.props.clientLocation,
		    destination: this.props.destination + " Bart Station",
		    travelMode: this.props.currentTravelMode.toUpperCase()
		  }, function(response, status) {
		    if (status === 'OK') {
		      directionsDisplay.setDirections(response);
		    } else {
		      window.alert('Directions request failed due to ' + status);
		    }
		  });
	}

	componentShouldUpdate(nextProps) {
		if(this.props.destination === nextProps.destination) {
			return false;
		}
	}

	componentDidUpdate() {
		this.calcRoute(directionsService, directionsDisplay);
	}

	render() {
		return(
			<div id="map" style={{height: '50%', width: '100%', background: 'skyblue'}}/>
		);
	}
}

export default NavigationMap;