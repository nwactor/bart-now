const express = require("express");
const app = express();
const server = require('http').createServer(app);  
const socketio = require("socket.io");
const io = socketio(server);
const bartAPI = require("./server-scripts/accessBartAPI");

//set up routes for serving html for web app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//=======================================================================
//=========================== socket handling ===========================
//=======================================================================

io.on('connection', client => {
	console.log("Client connected: " + client.id);
	client.station = null;
	client.on('stationRequested', stationAbbr => onNewStationRequest(stationAbbr, client));
	
	//if the server has been dormant, it will start by sending old info to the client...
	//so for the first client to wake it up, refresh the server's info and send it out again
	if(io.of('/').server.engine.clientsCount === 1) {
		bartAPI.getTrainETDs(io);
	}
});

//make the client a reciever of the new station, instead of their old one
//call helper function send client the trains for given station
function onNewStationRequest(stationAbbr, client) {
	client.leave(client.station);
	client.station = stationAbbr;
	client.join(client.station);
	console.log("Sending info for " + stationAbbr + " to client " + client.id);
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
//========================= Accessing BART API ==========================
//=======================================================================

// check for new trains every 30 seconds
function updateTrainSchedules() {
	if(io.of('/').server.engine.clientsCount !== 0) {
		console.log(io.of('/').server.engine.clientsCount);
		bartAPI.getTrainETDs(io);
	} else {
		console.log("No clients connected: no need to ping BART server");
	}
}

bartAPI.getTrainETDs(io);
var checkBartInterval = setInterval(updateTrainSchedules, 30000);


//================= Begin server listening (not app!) ===================

const PORT = process.env.PORT || 8080;
server.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});