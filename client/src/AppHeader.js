import React, { Component } from 'react';
import './AppHeader.css';
import StationNames from "./static-data/StationNames";
import StationDropdown from "./StationDropdown";


class AppHeader extends Component {
	render() {
		return (
			<header className="App-header">
				<div style={{flex: 1}}>
				<h1 className="App-title">BART Now</h1>
				</div>
				<div className="station-row">
					<h2 className="station-name-header">{StationNames[this.props.currentStation]}</h2>	
				</div>
				<div style={{flex: 1}}>
					<StationDropdown setCurrentStation={this.props.setCurrentStation}/>
				</div>
			</header>
		);
	}
}

export default AppHeader;