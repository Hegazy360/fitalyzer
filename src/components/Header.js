import React from 'react';
import PropTypes from 'prop-types';
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

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Header;
