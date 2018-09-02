import React, {Component} from 'react';
import Header from './components/Header'
import TransitionContainer from './components/TransitionContainer'
import { Grid } from 'semantic-ui-react'
import './App.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as auth from './redux/actions/authActions'

const mapStateToProps = store => {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    isFetching: store.auth.isFetching,
    profile: store.auth.profile,
    error: store.auth.error
  }
}

class App extends Component {
  render() {
    return (
      <Grid container>
        <Grid.Column>
          <div className="App">
            <Header loginRequest = {auth.loginRequest}/>
            <TransitionContainer />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(
    connect(mapStateToProps, auth)(App)
);
