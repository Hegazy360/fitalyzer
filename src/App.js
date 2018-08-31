import React, {Component} from 'react';
import Header from './components/Header'
import TransitionContainer from './components/TransitionContainer'
import { Grid } from 'semantic-ui-react'
import './App.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as user from './redux/actions/userActions'

const mapStateToProps = store => {
  return {
    current_user: store.user.current_user,
    jwt: store.user.jwt,
  }
}

class App extends Component {
  render() {
    return (
      <Grid container>
        <Grid.Column>
          <div className="App">
            <Header authenticateUser={this.props.authenticateUser} disconnectUser={this.props.disconnectUser} current_user={this.props.current_user} />
            <TransitionContainer />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(
    connect(mapStateToProps, user)(App)
);
