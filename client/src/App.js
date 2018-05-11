import React, { Component } from 'react';
import './App.css';
import SocketIOClient from 'socket.io-client';
import StationLocator from './helper-scripts/StationLocator';
import apiHost from './helper-scripts/APIHost';
import AppHeader from './AppHeader';
import TrainListScroller from './TrainListScroller';


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
    this.socket = SocketIOClient(apiHost);
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

  async onLocationFound(location) {
    var parsedLocation = location.coords.latitude + ',' + location.coords.longitude;
    console.log(parsedLocation);
    await this.setState({clientLocation: parsedLocation});
    
    var closestStation = StationLocator.getClosestStation(this.state.clientLocation);
    var prevClosestStation = this.state.closestStation;
    if(closestStation !== prevClosestStation) {
      await this.setState({closestStation});
      
      //if there isn't a pre-set station, automatically search 
      //trains for the nearby station that was just found
      if(this.state.currentStation === '') {
        this.setState({currentStation: closestStation}, () => {
          this.socket.emit('stationRequested', this.state.currentStation);
        });
      }
    }
  }

  // METHODS TO PASS DOWN AS PROPS TO CHILDREN
  
  setCurrentStation(stationAbbr) {
    if(stationAbbr !== '') {
      this.setState({currentStation: stationAbbr}, () => {
        this.socket.emit('stationRequested', this.state.currentStation);
      });
    } else {
      this.setState({currentStation: this.state.closestStation}, () => {
        this.socket.emit('stationRequested', this.state.currentStation);
      });
    }
  }

  //END PROP METHODS

  render() {
    const trains = this.state.trains;
    return (
      <div className="App">
        <AppHeader 
          currentStation={this.state.currentStation}
          setCurrentStation={this.setCurrentStation.bind(this)}
        />
        <div id="lower-section">
          <div className="column" id="col1">
             <TrainListScroller trains={trains}/>
          </div>
          <div className="column" id="col2">
            <img src={require("./assets/BART_cc_map.png")} alt="BART station map" id="station-map"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
