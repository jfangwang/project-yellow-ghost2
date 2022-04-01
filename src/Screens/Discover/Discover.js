import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
// import PropTypes from 'prop-types';

export class Discover extends Component {
  render() {
    return (
      <div>
        <Navbar opacity={0} position="relative" />
        <h1>Discover</h1>
      </div>
    );
  }
}

Discover.propTypes = {

};

export default Discover;