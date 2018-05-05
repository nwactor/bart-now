import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TrainPanel from "./TrainPanel";
import SocketIOClient from 'socket.io-client';

class App extends Component {
  state = {
    trains: []
  };

  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('trainUpdate', trainData => {
      console.log(trainData);
      var trains = [];
      trainData.forEach(destination => {
        destination.estimate.forEach((singleTrain, index) => {
          var train = singleTrain;
          train.abbreviation = destination.abbreviation;
          train.destination = destination.destination;
          trains.push(train);
        });
      });
      this.setState({trains});
    });
    this.socket.emit('stationRequested', '24TH');
  }

  render() {
    const trains = this.state.trains;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BART-Now development</h1>
        </header>
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

export default App;
