const EarthRadius = 6371000; //meters


var distanceCalculator = {
	calculateDistance: function(location1, location2) {
		var lat1 = location1.split(',')[0];
		var long1 = location1.split(',')[1];
		var lat2 = location2.split(',')[0];
		var long2 = location2.split(',')[1];

		var latDifference = degreesToRadians(lat1 - lat2);
		var longDifference = degreesToRadians(long1 - long2);

		var a = Math.pow(Math.sin(latDifference / 2), 2) +
		(
			Math.cos(lat1) *
			Math.cos(lat2) *
			Math.pow(Math.sin(longDifference / 2), 2)
		);
		
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		//finally, the distance
		return EarthRadius * c;
	}
};

function degreesToRadians(degrees) {
	return degrees * (Math.PI / 180);
}

module.exports = distanceCalculator;