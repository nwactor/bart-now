import React, { Component } from 'react';
import StationNames from "./static-data/StationNames";

class StationDropdown extends Component {
	state = {
		selectValue: "(view nearest station)"
	};

	handleStationSelect(e) {
		var stationName = e.target.value;
		this.setState({selectValue: stationName});

		if(stationName !== "(view nearest station)") {
			var stationAbbr = this.getStationAbbrFromName(stationName);
			this.props.setCurrentStation(stationAbbr);
		} else {
			this.props.setCurrentStation('');
		}
	}

	getStationAbbrFromName(stationName) {
		var stationAbbrs = Object.keys(StationNames);
		//Interesting: This code doesn't work with a for each loop.
		//Even though the strings are identical, casted to type String,
		//and trimmed, a for each loop will never say that they're equal.
		for(let i = 0; i < stationAbbrs.length; i++) {
			if(StationNames[stationAbbrs[i]] === stationName) {
				return stationAbbrs[i];
			}
		}
		console.log("Error: Station Not Found.");
	}

	render() {
		return(
			<div>
				<select 
				id="station-dropdown"
				value={this.state.selectValue}
				onChange={this.handleStationSelect.bind(this)}
				>
					<option>(view nearest station)</option>
					<option>12th St. Oakland City Center</option>
					<option>16th St. Mission (SF)</option>
					<option>19th St. Oakland</option>
					<option>24th St. Mission (SF)</option>
					<option>Antioch</option>
					<option>Ashby (Berkeley)</option>
					<option>Balboa Park (SF)</option>
					<option>Bay Fair (San Leandro)</option>
					<option>Castro Valley</option>
					<option>Civic Center / UN Plaza</option>
					<option>Coliseum</option>
					<option>Colma</option>
					<option>Concord</option>
					<option>Daly City</option>
					<option>Downtown Berkeley</option>
					<option>Dublin / Pleasanton</option>
					<option>El Cerrito del Norte</option>
					<option>El Cerrito Plaza</option>
					<option>Embarcadero (SF)</option>
					<option>Fremont</option>
					<option>Fruitvale (Oakland)</option>
					<option>Glen Park (SF)</option>
					<option>Hayward</option>
					<option>Lafayette</option>
					<option>Lake Merritt (Oakland)</option>
					<option>MacArthur (Oakland)</option>
					<option>Millbrae</option>
					<option>Montgomery St. (SF)</option>
					<option>North Berkeley</option>
					<option>North Concord / Martinez</option>
					<option>Oakland International Airport</option>
					<option>Orinda</option>
					<option>Pittsburg / Bay Point</option>
					<option>Pittsburg Center</option>
					<option>Pleasant Hill / Contra Costa Centre</option>
					<option>Powell St. (SF)</option>
					<option>Richmond</option>
					<option>Rockridge (Oakland)</option>
					<option>San Bruno</option>
					<option>San Francisco International Airport</option>
					<option>San Leandro</option>
					<option>South Hayward</option>
					<option>South San Francisco</option>
					<option>Union City</option>
					<option>Walnut Creek</option>
					<option>Warm Springs / South Fremont</option>
					<option>West Dublin / Pleasanton</option>
					<option>West Oakland</option>
				</select>
			</div>
		);
	}
}

export default StationDropdown;