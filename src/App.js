import React, {Component} from 'react';
import Header from './components/Header'
import TransitionContainer from './components/TransitionContainer'
import { Grid } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid container>
        <Grid.Column>
          <div className="App">
            <Header/>
            <TransitionContainer />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
