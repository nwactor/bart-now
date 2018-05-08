import React, { Component } from 'react';
import './AppHeader.css';
import StationNames from "./static-data/StationNames";

class AppHeader extends Component {
	render() {
		return (
			<header className="App-header">
				<h1>BART Now</h1>
				<div className="station-row">
					<h2 className="station-name-header">{StationNames[this.props.currentStation]}</h2>
					<select>
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
			</header>
		);
	}
}

export default AppHeader;