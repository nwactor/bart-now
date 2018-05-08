import React, { Component } from 'react';
import './App.css';
import TrainListScroller from './TrainListScroller';
import SocketIOClient from 'socket.io-client';
import distanceCalculator from './distanceCalculator';
import StationLocations from './static-data/StationLocations'


class App extends Component {
  state = {
    trains: [],
    currentTransportation: 'walk',
    currentStation: '',
    closestStation: '',
    clientLocation: null,
    geoInterval: null
  };

  componentDidMount() {
    this.configureWebSocket();
    this.loadUserPreferences();
    this.beginGeolocation();
  }

  configureWebSocket() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('trainUpdate', trainData => {
      var trains = [];
      trainData.forEach(destination => {
        destination.estimate.forEach((singleTrain, index) => {
          var train = singleTrain;
          train.abbreviation = destination.abbreviation;
          train.destination = destination.destination;
          trains.push(train);
        });
      });
      console.log(trains);
      this.setState({trains});
    });
  }

  loadUserPreferences() {
    var defaultTravelPreference = localStorage.getItem('defaultTravelPreference');
    var defaultStationPreference = localStorage.getItem('defaultStationPreference');

    if(defaultTravelPreference !== null) {
      this.setState({currentTransportation: defaultTravelPreference});
    }
    if(defaultStationPreference !== null) {
      this.setState({currentStation: defaultStationPreference});
    }
  }

  beginGeolocation() {
    var geoOptions = {
      enableHighAccuracy: true, 
      maximumAge        : 5000,
      timeout           : 4000
    };
    var geoInterval = navigator.geolocation.watchPosition(this.onLocationFound.bind(this), null, geoOptions);
    this.setState({geoInterval});
  }

  onLocationFound(location) {
    var parsedLocation = location.coords.latitude + ',' + location.coords.longitude;
    console.log(parsedLocation);
    this.setState({clientLocation: parsedLocation});
    
    var closestStation = this.getClosestStation();
    var prevClosestStation = this.state.closestStation;
    if(closestStation !== prevClosestStation) {
      this.setState({closestStation});
      
      //if there isn't a pre-set station, automatically search 
      //trains for the nearby station that was just found
      if(this.state.currentStation === '') {
        this.setState({currentStation: closestStation});
        this.socket.emit('stationRequested', closestStation);
      }
    }
  }

  //CURRENTLY ONLY TAKING INTO ACCOUNT "AS THE CROW FLIES"
  //Should move logic to its own file
  getClosestStation() {
    var clientLocation = this.state.clientLocation;

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

  render() {
    const trains = this.state.trains;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BART-Now development</h1>
          <h2>{this.state.currentStation}</h2>
        </header>
        <TrainListScroller trains={trains}/>
      </div>
    );
  }
}

export default App;
