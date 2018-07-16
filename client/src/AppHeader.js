import React, { Component } from 'react';
import './css/AppHeader.css';
import StationNames from "./static-data/StationNames";
import StationDropdown from "./StationDropdown";


class AppHeader extends Component {
	render() {
		return (
			<header className="App-header">
				<div className="header-section">
					<h1 className="App-title">BART Now</h1>
				</div>
				<div className="station-row, header-section">
					<h2 className="station-name-header">{StationNames[this.props.currentStation]}</h2>	
				</div>
				<div className="header-section">
					<div style={{height: "3vh"}}>
						<StationDropdown className="station-dropdown" setCurrentStation={this.props.setCurrentStation}/>
					</div>
				</div>
			</header>
		);
	}
}

export default AppHeader;