import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import './css/Header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className={classes.flex}>
          <Link to="/">
            Fitalyzer
          </Link>
          <Link to="/gym">
            Gym
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
