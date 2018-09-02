import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './css/Header.css';
import { Menu, Button } from 'semantic-ui-react'
import * as AuthService from '../utils/AuthService';

class Header extends Component {

  handleLoginClick = () => {
    AuthService.login();
    this.props.loginRequest();
  };

  render() {
    return (
      <Menu className="top fixed">
        <Menu.Item>
          <Link to="/">
            Fitalyzer
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/gym">
            Gym
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          {!this.props.current_user &&
            <Menu.Item>
              <Button primary onClick={AuthService.login.bind(this)}>Sign In</Button>
              <Button primary>Sign Up</Button>
            </Menu.Item>
          }
          {this.props.current_user &&
            <Menu.Item>
              {this.props.current_user.name}
              <Button primary>Disconnect</Button>
            </Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
