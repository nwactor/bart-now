import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SocketIOClient from 'socket.io-client';

class App extends Component {
  state = {
    trains: []
  };

  componentDidMount() {
    this.socket = SocketIOClient('http://localhost:8080');
    this.socket.on('trainUpdate', trainData => {
      var trainString = '';
      trainData.forEach(train => {
        trainString += (JSON.stringify(train) + '\n');
      });
      this.setState({trains: trainString});
    });
    this.socket.emit('stationRequested', '24TH');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.trains}
        </p>
      </div>
    );
  }
}

export default App;
