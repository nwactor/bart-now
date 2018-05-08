import React, { Component } from 'react';
import "./TrainListScroller.css";
import TrainPanel from "./TrainPanel";

class TrainListScroller extends Component {
	
	//All of the 10s in parseInt are radixes, saying that we're parsing a base 10 int
	sortTrains(trains) {
		trains.sort((train1, train2) => {
			var train1ETA = parseInt(parseInt(train1.minutes, 10) + parseInt(train1.delay, 10), 10); 
			var train2ETA =	parseInt(parseInt(train2.minutes, 10) + parseInt(train2.delay, 10), 10);

			if(parseInt(train1ETA, 10) === 'NaN' && parseInt(train2ETA, 10) === 'NaN') {
		      	return 0;
		    } else if(parseInt(train1ETA, 10) === 'NaN') {
		      	return -1; //1 is proably 'leaving' so it goes first
		    } else if(parseInt(train2ETA, 10) === 'NaN') {
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
			<div className="traintainer">
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