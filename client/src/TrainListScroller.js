import React, { Component } from 'react';
import "./TrainListScroller.css";
import TrainPanel from "./TrainPanel";

class TrainListScroller extends Component {
	
	sortTrains(trains) {
		trains.sort((train1, train2) => {
			var train1ETA = parseInt(parseInt(train1.minutes) + parseInt(train1.delay)); 
			var train2ETA =	parseInt(parseInt(train2.minutes) + parseInt(train2.delay));

			if(parseInt(train1ETA) === 'NaN' && parseInt(train2ETA) === 'NaN') {
		      	return 0;
		    } else if(parseInt(train1ETA) === 'NaN') {
		      	return -1; //1 is proably 'leaving' so it goes first
		    } else if(parseInt(train2ETA) === 'NaN') {
		      	return 1; //2 probably 'leaving'
		    } else {
		      	return Number(train1ETA) - Number(train2ETA); 
		    }
		});
		
		return trains;
	}

	render() {
		const trains = this.sortTrains(this.props.trains);
		return(
			<div className="trainstainer">
				{trains.map((train, index) =>
			        <TrainPanel
			          	key={index}
			            destination={train.destination}
			            color={train.hexcolor}
			            minutes={train.minutes}
			            delay={train.delay}
			        />
			    )}
		    </div>
		);
	}
}

export default TrainListScroller;