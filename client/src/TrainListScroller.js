import React, { Component } from 'react';
import "./css/TrainListScroller.css";
import TrainPanel from "./TrainPanel";

class TrainListScroller extends Component {
	
	//All of the 10s in parseInt are radixes, they say that we're parsing a base 10 int
	sortTrains(trains) {
		trains.sort((train1, train2) => {
			var train1ETA = parseInt(parseInt(train1.minutes.trim(), 10) + Math.floor(parseInt(train1.delay.trim(), 10), 10) / 60, 10); 
			var train2ETA =	parseInt(parseInt(train2.minutes.trim(), 10) + Math.floor(parseInt(train2.delay.trim(), 10), 10) / 60, 10);
			if(isNaN(parseInt(train1ETA, 10))) { //1 is 'leaving' so it goes first
		      	return -1;
		    } else if(isNaN(parseInt(train2ETA, 10))) { //2 'leaving'
		      	return 1;
		    } else {
		      	return train1ETA - train2ETA; 
		    }
		});
		// console.log(trains);
	}

	render() {
		const trains = this.props.trains.slice(); //clone the array because props can't change
		this.sortTrains(trains);
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
				{/*<button>(View More Trains)</button>*/}
		    </div>
		);
	}
}

export default TrainListScroller;