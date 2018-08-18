import React, {Component} from 'react';
import Header from './components/Header'
import Container from './components/Container'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4569',
      main: '#ff1744',
      dark: '#b2102f',
      contrastText: '#fff',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Header />
          <Container />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
