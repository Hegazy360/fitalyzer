import React, {Component} from 'react';
import Header from './components/Header'
import Container from './components/Container'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'rgb(255, 255, 255)',
      main: '#524763',
      dark: '#373142',
      contrastText: 'rgb(255, 255, 255)',
    },
    secondary: {
      light: 'rgb(241, 193, 93)',
      main: 'rgb(130, 216, 216)',
      dark: '#b2102f',
      contrastText: 'rgb(55, 49, 66)',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header theme={theme}/>
          <Container />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
