import React, {Component} from 'react';
import Gym from './components/Gym'
import 'semantic-ui-css/semantic.css'
import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <div className="App-header">
            <h1>Fitalyzer</h1>
          </div>
          <Gym />
        </div>
      );
    }
  }

  export default App;
