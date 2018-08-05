import React, {Component} from 'react';
import Gym from './components/Gym'
import Home from './components/Home'
import Header from './components/Header'
import Container from './components/Container'
import 'semantic-ui-css/semantic.css'
import './App.css';
import {Switch, Route, withRouter} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  render() {
    return (<div className="App">
      <Header />
      <Container />
    </div>);
  }
}

export default App;
