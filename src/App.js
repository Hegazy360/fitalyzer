import React, {Component} from 'react';
import Gym from './components/Gym'
import Home from './components/Home'
import Header from './components/Header'
import 'semantic-ui-css/semantic.css'
import './App.css';
import {Route} from "react-router-dom";

class App extends Component {
  render() {
    return (<div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/gym" component={Gym} />
    </div>);
  }
}

export default App;
