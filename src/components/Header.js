import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './css/Header.css';
import SignInForm from './SignInForm';
import { Menu, Button } from 'semantic-ui-react'

class Header extends Component {

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
              <SignInForm onSubmit={this.props.authenticateUser}/>
              <Button primary>Sign Up</Button>
            </Menu.Item>
          }
          {this.props.current_user &&
            <Menu.Item>
              {this.props.current_user.name}
              <Button primary onClick={this.props.disconnectUser}>Disconnect</Button>
            </Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
