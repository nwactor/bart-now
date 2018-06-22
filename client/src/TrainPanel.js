import React, { Component } from 'react';
import "./TrainPanel.css";


class TrainPanel extends Component {
	
	getTimeRemaining() {
		var minutes = this.props.minutes;
		var delay = this.props.delay;

		if(minutes === "Leaving") { return minutes; }
		else {
			var totalTime = parseInt(minutes, 10) + Math.floor(parseInt(delay, 10) / 60);
			if(totalTime <= 60) {
				return totalTime + " min";
			} else {
				return Math.floor(totalTime / 60) + " hour " + (totalTime % 60) + " min";
			}
		}
	}

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
					<span>{this.getTimeRemaining()}</span>
				</div>
			</div>
		);
	}
}

export default TrainPanel;