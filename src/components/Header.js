import React from 'react';
import {Link} from "react-router-dom";
import './css/Header.scss';
import { Menu } from 'semantic-ui-react'

function Header(props) {
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
    </Menu>
  );
}

export default Header;
