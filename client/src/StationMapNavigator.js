import React, { Component } from 'react'; 

class StationMapNavigator extends Component {
	state = {
		directionsService: null,
		directionsDisplay: null
	}

	onComponentDidMount() {
		this.initMap();
	}

	initMap() {
		fetch("https://maps.googleapis.com/maps/api/js?key=AIzaSyDpYGb8BVSnp_5KgwqPgZbsVnRWfT8NS5I")
		.then(google => {
			console.log(google);
			console.log("yolo");
			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			this.setState({directionsService});
			this.setState({directionsDisplay}, function() {
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 10,
					center: {lat: 37.75, lng: -122.3}
				});
				this.state.directionsDisplay.setMap(map);
			});
		});
	}

	calculateAndDisplayRoute(directionsService, directionsDisplay) {
		this.state.directionsService.route({
			origin: this.props.clientLocation,
			destination: this.props.targetStation,
			//travelMode: currentTravelMode.toUpperCase()
		}, function(response, status) {
			if (status === 'OK') {
			  directionsDisplay.setDirections(response);
			} else {
			  window.alert('Directions request failed due to ' + status);
			}
		});
	}

	render() {
		return (
			<div id="map"/>
		);
	}
}

export default StationMapNavigator;