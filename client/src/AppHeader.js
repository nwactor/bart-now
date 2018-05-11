import React, { Component } from 'react';
import './AppHeader.css';
import StationNames from "./static-data/StationNames";
import StationDropdown from "./StationDropdown";


class AppHeader extends Component {
	render() {
		return (
			<header className="App-header">
				<h1 className="App-title">BART Now</h1>
				<div className="search-row">
					<h2 className="station-name-header">{StationNames[this.props.currentStation]}</h2>	
					<StationDropdown setCurrentStation={this.props.setCurrentStation}/>
					{/*<button id="station-search-button"></button>*/}
				</div>
			</header>
		);
	}
}

export default AppHeader;