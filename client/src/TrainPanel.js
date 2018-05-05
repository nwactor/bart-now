import React, { Component } from 'react';
import "./TrainPanel.css";

class TrainPanel extends Component {
	render() {
		return (
			<div className="TrainPanel">
				<div className="row1">
					<span>{this.props.destination}</span>
				</div>
				<div className="row2">
					<div 
						className="colorStripe"
						style={{backgroundColor: this.props.color}}>
					</div>
					<span>{this.props.minutes /*+ this.props.delay*/}</span>
				</div>
			</div>
		);
	}
}

export default TrainPanel;