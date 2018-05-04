const express = require("express");
const app = express();
const server = require('http').createServer(app);  
const socketio = require("socket.io");
const io = socketio(server);
const bartAPI = require("./server-scripts/accessBartAPI");

//set up routes for serving html for web app
// var routes = require("./routes/routes");
// app.use("/", routes);

//=======================================================================
//=========================== socket handling ===========================
//=======================================================================

// io.set('origins', 'http://localhost:3000 http://192.168.65.2:3000 http://10.0.1.59:3000 http://127.0.0.1:3000');

io.on('connection', client => {
	console.log("Client connected: " + client);
	client.station = null;
	client.on('stationRequested', stationAbbr => onNewStationRequest(stationAbbr, client));
});

//make the client a reciever of the new station, instead of their old one
//call helper function send client the trains for given station
function onNewStationRequest(stationAbbr, client) {
	client.leave(client.station);
	client.station = stationAbbr;
	client.join(client.station);
	console.log("Sending info for " + stationAbbr + " to client " + client);
	sendUpdatedTrains(client, stationAbbr);
}

//send a client the trains for given station 
function sendUpdatedTrains(client, stationAbbr) {
	bartAPI.getStations().forEach(station => {
		if(station.abbr === stationAbbr) {
			client.emit("trainUpdate", station.trains);
			return;
		}
	});
}

//=======================================================================
//========================= end socket handling =========================
//=======================================================================

// check for new trains every 30 seconds
bartAPI.getTrainETDs(io);
var checkBartAPI = setInterval(bartAPI.getTrainETDs, 30000, io);


//start server listening

const PORT = process.env.PORT || 8080;
server.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});