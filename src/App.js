import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome JS Department GAME </h2>
          <h2>"Labytinth"</h2>
        </div>
        <p className="App-intro">
          Let's do fun! =]
        </p>
      </div>
    );
  }
}

export default App;
