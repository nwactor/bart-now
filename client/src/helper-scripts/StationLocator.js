import StationLocations from '../static-data/StationLocations';
import distanceCalculator from './distanceCalculator';

class StationLocator {
	//CURRENTLY ONLY TAKING INTO ACCOUNT "AS THE CROW FLIES"
	static getClosestStation(clientLocation) {
	    var closestFoundStation = StationLocations.reduce((closestStation, currentStation) => {
	      	var closestDist = distanceCalculator.calculateDistance(
	        	`${closestStation.latitude}, ${closestStation.longitude}`,
				clientLocation
	      	);      
		   	var currentDist = distanceCalculator.calculateDistance(
		    	`${currentStation.latitude}, ${currentStation.longitude}`,
		    	clientLocation
		    );

	      	if(currentDist < closestDist) { 
	        	return currentStation; 
	      	}
	      	else { 
	        	return closestStation; 
	      	}
	    });
	    return closestFoundStation.abbr;
	}
}

export default StationLocator;