import React, {Component} from 'react';
import Gym from './components/Gym'
import 'semantic-ui-css/semantic.css'
import './App.css';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (<div className="App">
      <div className="App-header">
        <Typography variant="display4" gutterBottom="gutterBottom" className="big_title">
          Fitalyzer
        </Typography>
      </div>
      <Gym/>
    </div>);
  }
}

export default App;
