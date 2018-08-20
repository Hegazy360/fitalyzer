import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './css/Header.scss';

function Header(props) {
  return (
    <div class="ui top fixed menu">
      <Link class="item" to="/">
        Fitalyzer
      </Link>
      <Link class="item" to="/gym">
        Gym
      </Link>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Header;
